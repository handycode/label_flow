const sendMock = jest.fn()
const getSignedUrlMock = jest.fn()

jest.mock('@aws-sdk/client-s3', () => ({
  S3Client: jest.fn().mockImplementation((config) => ({ config, send: sendMock })),
  ListObjectsV2Command: jest.fn().mockImplementation((input) => input),
  GetObjectCommand: jest.fn().mockImplementation((input) => input),
}))

jest.mock('@aws-sdk/s3-request-presigner', () => ({
  getSignedUrl: getSignedUrlMock,
}))

describe('s3 client helpers', () => {
  let s3Module: typeof import('@/lib/s3/client')

  beforeEach(async () => {
    jest.resetModules()
    sendMock.mockReset()
    getSignedUrlMock.mockReset()

    process.env.S3_BUCKET_NAME = 'test-bucket'
    process.env.AWS_REGION = 'us-east-1'
    process.env.AWS_ACCESS_KEY_ID = 'test-key-id'
    process.env.AWS_SECRET_ACCESS_KEY = 'test-secret'

    s3Module = await import('@/lib/s3/client')
  })

  it('uses default values when env vars are missing', async () => {
    jest.resetModules()
    delete process.env.AWS_REGION
    delete process.env.AWS_ACCESS_KEY_ID
    delete process.env.AWS_SECRET_ACCESS_KEY
    delete process.env.S3_BUCKET_NAME

    const s3ModuleTest = await import('@/lib/s3/client')

    expect(s3ModuleTest.BUCKET_NAME).toBe('interviewonly')
  })

  it('detects media types by extension', () => {
    expect(s3Module.getMediaType('photo.JPG')).toBe('image')
    expect(s3Module.getMediaType('video.MP4')).toBe('video')
    expect(s3Module.getMediaType('notes.txt')).toBe('other')
  })

  it('lists and filters S3 objects', async () => {
    const now = new Date('2024-01-01')
    sendMock.mockResolvedValue({
      Contents: [
        { Key: 'photo/cat.jpg', Size: 100, LastModified: now },
        { Key: 'video/movie.mp4', Size: 200, LastModified: now },
        { Key: 'doc/readme.txt', Size: 300, LastModified: now },
        { Key: 'photo/empty.png', Size: 0 },
      ],
      IsTruncated: true,
      NextContinuationToken: 'next-token',
    })

    const result = await s3Module.listS3Objects('photo', 2, 'token-1')

    expect(sendMock).toHaveBeenCalledWith({
      Bucket: 'test-bucket',
      Prefix: 'photo',
      MaxKeys: 2,
      ContinuationToken: 'token-1',
    })
    expect(result.objects).toEqual([
      {
        key: 'photo/cat.jpg',
        size: 100,
        lastModified: now,
        type: 'image',
      },
      {
        key: 'video/movie.mp4',
        size: 200,
        lastModified: now,
        type: 'video',
      },
    ])
    expect(result.continuationToken).toBe('next-token')
  })

  it('uses default maxKeys when not provided', async () => {
    sendMock.mockResolvedValue({
      Contents: [],
      IsTruncated: false,
    })

    await s3Module.listS3Objects()

    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        MaxKeys: 1000,
      })
    )
  })

  it('handles missing LastModified in response', async () => {
    sendMock.mockResolvedValue({
      Contents: [
        { Key: 'photo/test.jpg', Size: 100 },
      ],
      IsTruncated: false,
    })

    const result = await s3Module.listS3Objects()

    expect(result.objects[0].lastModified).toBeInstanceOf(Date)
  })

  it('returns no continuation token when IsTruncated is false', async () => {
    sendMock.mockResolvedValue({
      Contents: [
        { Key: 'photo/test.jpg', Size: 100, LastModified: new Date() },
      ],
      IsTruncated: false,
    })

    const result = await s3Module.listS3Objects()

    expect(result.continuationToken).toBeUndefined()
  })

  it('handles empty Contents array', async () => {
    sendMock.mockResolvedValue({
      Contents: [],
      IsTruncated: false,
    })

    const result = await s3Module.listS3Objects()

    expect(result.objects).toEqual([])
  })

  it('handles missing Contents in response', async () => {
    sendMock.mockResolvedValue({
      IsTruncated: false,
    })

    const result = await s3Module.listS3Objects()

    expect(result.objects).toEqual([])
  })

  it('creates a presigned url', async () => {
    getSignedUrlMock.mockResolvedValue('signed-url')

    const url = await s3Module.getPresignedUrl('photo/cat.jpg', 60)

    expect(url).toBe('signed-url')
    expect(getSignedUrlMock).toHaveBeenCalled()
  })

  it('uses default expiresIn for presigned url', async () => {
    getSignedUrlMock.mockResolvedValue('signed-url')

    await s3Module.getPresignedUrl('photo/cat.jpg')

    expect(getSignedUrlMock).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      { expiresIn: 3600 }
    )
  })

  it('returns a public S3 object url', async () => {
    const url = await s3Module.getS3ObjectUrl('path to/photo.jpg')

    expect(url).toBe('https://test-bucket.s3.us-east-1.amazonaws.com/path%20to%2Fphoto.jpg')
  })
})
