import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TooltipContent } from '@radix-ui/react-tooltip';

export const SensorNode = () => {
  const onClickHandler = () => {
    console.log('clicked');
  };
  return (
    <Dialog>
      <DialogTrigger>Node</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Node Details</DialogTitle>
          <DialogDescription>
            Various details about the node will be displayed here.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
