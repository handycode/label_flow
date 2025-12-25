'use client'

interface Annotation {
  id: string;
  type: string;
  label?: string | null;
}

interface Metadata {
  remarks: string;
  issues: string[];
}

interface Props {
  metadata: Metadata;
  onMetadataChange: (metadata: Metadata) => void;
  annotations: Annotation[];
}

export default function MetadataPanel({
  metadata,
  onMetadataChange,
  annotations,
}: Props) {
  const addIssue = () => {
    const issue = prompt('请输入问题描述:')
    if (issue) {
      onMetadataChange({
        ...metadata,
        issues: [...metadata.issues, issue],
      })
    }
  }

  const removeIssue = (index: number) => {
    onMetadataChange({
      ...metadata,
      issues: metadata.issues.filter((_, i) => i !== index),
    })
  }

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

      {/* 问题标记 */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <h3 className="card-title text-base">问题标记</h3>
            <button className="btn btn-xs btn-primary" onClick={addIssue}>
              添加
            </button>
          </div>
          {metadata.issues.length === 0 ? (
            <p className="text-sm text-base-content/60">暂无问题</p>
          ) : (
            <ul className="space-y-2">
              {metadata.issues.map((issue, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-2 bg-error/10 rounded"
                >
                  <span className="text-sm text-error">{issue}</span>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => removeIssue(index)}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
