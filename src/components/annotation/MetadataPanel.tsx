'use client'

interface Annotation {
  id: string;
  type: string;
  label?: string | null;
}

interface Metadata {
  remarks: string;
  score?: number;
}

interface TaskUser {
  username: string;
  email?: string;
}

interface Props {
  metadata: Metadata;
  annotations: Annotation[];
  userRole?: string;
  isReadOnly?: boolean;
  creator?: TaskUser;
  labeler?: TaskUser;
  checker?: TaskUser;
  onDeleteAnnotation?: (id: string) => void;
}

export default function MetadataPanel({
  metadata,
  annotations,
  userRole,
  creator,
  labeler,
  checker,
  isReadOnly = false,
  onDeleteAnnotation,
}: Props) {
  return (
    <div className="space-y-4">
      {/* 任务信息 */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h3 className="card-title text-base">任务信息</h3>
          <div className="text-sm space-y-2">
            {creator && (
              <div className="flex justify-between">
                <span className="text-base-content/60">创建者:</span>
                <span className="font-medium">{creator.username}</span>
              </div>
            )}
            {labeler && (
              <div className="flex justify-between">
                <span className="text-base-content/60">标注员:</span>
                <span className="font-medium">{labeler.username}</span>
              </div>
            )}
            {checker && (
              <div className="flex justify-between">
                <span className="text-base-content/60">质检员:</span>
                <span className="font-medium">{checker.username}</span>
              </div>
            )}
          </div>
        </div>
      </div>

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
                  <div className="flex items-center gap-2">
                    {ann.label && (
                      <span className="badge badge-sm">{ann.label}</span>
                    )}
                    {!isReadOnly && onDeleteAnnotation && (
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => onDeleteAnnotation(ann.id)}
                      >
                        删除
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 评分 - 仅质检员可见 */}
      {userRole !== 'CHECKER' && metadata.score && (
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title text-base">质量评分</h3>
            {metadata.score && (
            <span className="text-sm font-semibold text-primary">
              已评分: {metadata.score}/5
            </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
