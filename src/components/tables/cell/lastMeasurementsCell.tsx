import { useLanguage } from '@/LocalizationProvider';
import { Progress } from '@/components/ui/progress';
import { Measurement, Sensor } from '@/lib/types';
import { decodeCombined } from '@/lib/utils';

export const LastMeasurementsCell = ({
    lastMeasurements,
    sensors,
    plotId,
    onOpenChart,
}: {
    lastMeasurements: Array<Measurement>;
    sensors: Array<Sensor>;
    plotId: string;
    onOpenChart: (plotId: string, sensor: Sensor) => void;
}) => {
    const { language } = useLanguage();

    return (
        <div className="flex flex-row flex-wrap">
            {lastMeasurements.map((measurement) => {
                const sensor = sensors.find((s) => s.id.toString() === measurement.sensorID);
                const valuePercentage = sensor
                    ? ((parseFloat(measurement.data) - sensor.typicalRange[0]) /
                        (sensor.typicalRange[1] - sensor.typicalRange[0])) *
                    100
                    : 0;

                return (
                    <div
                        key={`sensor-${measurement.sensorID}`}
                        className="flex flex-col p-2 border rounded-lg m-2 bg-gradient-to-r from-green-200 to-green-100 hover:to-green-200"
                    >
                        <button
                            type="button"
                            disabled={!sensor}
                            onClick={() => sensor && onOpenChart(plotId, sensor)}
                            className="w-full text-left"
                        >
                            <div className="flex flex-col cursor-pointer">
                                <div className="font-bold">
                                    {decodeCombined(sensor?.name as string, language)}
                                </div>
                                <div className="flex flex-row gap-2">
                                    <div className="font-bold">
                                        {isNaN(parseFloat(measurement.data)) ? '—' : parseFloat(measurement.data).toFixed(2)} {decodeCombined(sensor?.description ?? '', language)}
                                    </div>
                                </div>
                            </div>
                        </button>
                        <Progress value={valuePercentage} />
                    </div>
                );
            })}
        </div>
    );
};
