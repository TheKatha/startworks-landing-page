import { toast as sonnerToast } from "sonner"

export function useToast() {
  const toast = ({ title, description, ...props }) => {
    return sonnerToast(title, {
      description,
      ...props
    })
  }

  return {
    toast,
  }
}
