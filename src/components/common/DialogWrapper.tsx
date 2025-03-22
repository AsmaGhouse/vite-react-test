import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/utils/cn";
import { Download, Loader2, PlusIcon, UploadIcon, X } from "lucide-react";
import { DialogWrapperProps } from './common-components.types';

type IconType = "default" | "upload" | "download";

export function DialogWrapper({
  isOpen = false,
  setIsOpen = () => {},
  triggerBtnText,
  renderContent,
  title = "Edit Profile",
  description,
  showFooter = true,
  showHeader = true,
  isLoading,
  iconType = "default",
  triggerBtnClassName,
  className,
  onSave,
  footerBtnText,
}: DialogWrapperProps) {
  const getIcon = (type: IconType) => {
    const icons = {
      default: <PlusIcon />,
      upload: <UploadIcon />,
      download: <Download />,
    };
    return icons[type];
  };

  const icon = getIcon(iconType);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {triggerBtnText && (
        <DialogTrigger asChild>
        <Button className={triggerBtnClassName} disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" /> : icon}
          {triggerBtnText}
        </Button>
        </DialogTrigger>
      )}
     
      <DialogContent  className={cn("sm:max-w-[80%] md:max-w-[50%] w-full max-h-[90%] overflow-auto", className)}>
         <button
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition"
          onClick={() => setIsOpen(false)}
        >
          <X className="w-5 h-5 text-custom-primary hover:opacity-95 outline-none" />
        </button>
        {showHeader && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        {renderContent}

        {showFooter && (
          <DialogFooter className="sm:justify-center">
            {
              triggerBtnText && (
                <Button onClick={()=>{onSave?.()}} disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  footerBtnText || "Save"
                )}
              </Button>
              )
            }
           
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
