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

export const SensorNodeCell = ({ plotId }: { plotId: string }) => {
  const onClickHandler = () => {
    console.log('clicked');
    console.log(plotId);
  };
  return (
    <Dialog>
      <DialogTrigger
        onClick={onClickHandler}
        className="border p-1 rounded-lg bg-gradient-to-r from-green-200 to-green-100 hover:transition-all hover:to-green-200 "
      >
        Node {plotId}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Node {plotId} Details</DialogTitle>
          <DialogDescription>
            Various details about the node will be displayed here.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
