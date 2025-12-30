'use client'

interface Annotation {
  id: string;
  type: string;
  label?: string | null;
}

interface Metadata {
  remarks: string;
  issues: string[];
  score?: number;
}

interface Props {
  metadata: Metadata;
  onMetadataChange: (metadata: Metadata) => void;
  annotations: Annotation[];
  userRole?: string;
}

export default function MetadataPanel({
  metadata,
  onMetadataChange,
  annotations,
  userRole,
}: Props) {
  return (
    <div className="space-y-4">
      {/* 标注列表 */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h3 className="card-title text-base">标注列表</h3>
          {annotations.length === 0 ? (
            <p className="text-sm text-base-content/60">暂无标注</p>
          ) : (
            <ul className="space-y-2">
              {annotations.map((ann, index) => (
                <li
                  key={ann.id}
                  className="flex items-center justify-between p-2 bg-base-200 rounded"
                >
                  <span className="text-sm">
                    #{index + 1} {ann.type === 'RECT' ? '矩形' : '椭圆'}
                  </span>
                  {ann.label && (
                    <span className="badge badge-sm">{ann.label}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 备注 */}
      {userRole === 'CHECKER' && (
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title text-base">备注</h3>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="请输入备注信息..."
              value={metadata.remarks}
              onChange={(e) =>
                onMetadataChange({ ...metadata, remarks: e.target.value })
              }
              rows={3}
            />
          </div>
        </div>
      )}

      {/* 评分 - 仅质检员可见 */}
      {userRole === 'CHECKER' && (
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title text-base">质量评分</h3>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((score) => (
                  <button
                    key={score}
                    onClick={() =>
                      onMetadataChange({ ...metadata, score })
                    }
                    className={`btn btn-sm ${
                      metadata.score === score
                        ? 'btn-primary'
                        : 'btn-outline'
                    }`}
                  >
                    {score}
                  </button>
                ))}
              </div>
              {metadata.score && (
                <span className="text-sm font-semibold text-primary">
                  已评分: {metadata.score}/5
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
