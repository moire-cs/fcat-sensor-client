import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useLanguage } from '@/LocalizationProvider';
import { decodeCombined } from '@/lib/utils';

export const SensorNodeCell = ({ plotId }: { plotId: string }) => {
  const { language } = useLanguage();

  const onClickHandler = () => {
    console.log('clicked');
    console.log(plotId);
  };

  return (
    <Dialog>
      <DialogTrigger
        onClick={onClickHandler}
        className="border p-1 rounded-lg bg-gradient-to-r from-green-200 to-green-100 hover:to-green-200 hover:transition-all"
      >
        {decodeCombined('[en]Nodes[es]Nodo', language)} {plotId}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Node {plotId} Details</DialogTitle>
          <DialogDescription>
            <p className="text-green-600">Node is active and functioning properly.</p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
