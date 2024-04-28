import { useLanguage } from '@/LocalizationProvider';
import { Progress } from '@/components/ui/progress';
import { Measurement, Sensor } from '@/lib/types';
import { decodeCombined } from '@/lib/utils';

export const lastMeasurementsCell = (
  lastMeasurements: Array<Measurement>,
  sensors: Array<Sensor>,
) => (
  <div className="flex flex-row">
    {lastMeasurements.map((measurement) => {
      const sensor = sensors.find(
        (sensor) => sensor.id.toString() === measurement.sensorID,
      );
      const { language } = useLanguage();
      const valuePercentage = sensor
        ? ((parseFloat(measurement.data) - sensor.typicalRange[0]) /
            (sensor.typicalRange[1] - sensor.typicalRange[0])) *
          100
        : 0;
      console.log(valuePercentage);

      return (
        <div className="flex flex-col p-2 border rounded-lg m-2 bg-gradient-to-r from-green-200 to-green-100 hover:to-green-200">
          <div className="flex flex-col">
            <div className="font-bold">
              {decodeCombined(sensor?.name as string, language)}
            </div>
            <div className="flex flex-row">
              <div className="font-bold">
                {parseFloat(measurement.data).toFixed(2)}
              </div>
              <div>{sensor?.description}</div>
            </div>
          </div>
          <Progress value={valuePercentage} />
        </div>
      );
    })}
  </div>
);
