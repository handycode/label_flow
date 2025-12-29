import { ToastContainer } from './ui/Toast'
import MediaPreview from '@/components/MediaPreview'

const GlobalUI = ({ children }: { children: React.ReactNode }) => (
  <>
    <MediaPreview>{children}</MediaPreview>
    <ToastContainer />
  </>
)

export default GlobalUI
