import { useState, useEffect } from 'react';
import { useLanguage } from '@/LocalizationProvider';
import { Sensor } from '@/lib/types';
import { decodeCombined } from '@/lib/utils';
import axios from 'axios';
import { useTimezone } from '@/TimezoneProvider';
import { fromZonedTime, formatInTimeZone } from 'date-fns-tz';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

interface ChartData {
    timestamp: string;
    value: number;
}

export interface ChartTarget {
    plotId: string;
    sensor: Sensor;
}

// Page-level chart dialog, kept outside the table so resorting/polling the
// rows can't unmount (and thus close) it.
export const MeasurementChartDialog = ({
    target,
    onClose,
}: {
    target: ChartTarget | null;
    onClose: () => void;
}) => {
    const { language } = useLanguage();
    const { timezone } = useTimezone();
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [startDate, setStartDate] = useState<string>(() => {
        const d = new Date(); d.setDate(d.getDate() - 30);
        return formatInTimeZone(d, timezone, 'yyyy-MM-dd');
    });
    const [endDate, setEndDate] = useState<string>(
        () => formatInTimeZone(new Date(), timezone, 'yyyy-MM-dd')
    );
    const [loading, setLoading] = useState<boolean>(false);

    const plotId = target?.plotId ?? null;
    const sensor = target?.sensor ?? null;
    const sensorId = sensor?.id?.toString() ?? null;

    useEffect(() => {
        if (!plotId || !sensorId) return;
        let cancelled = false;
        setLoading(true);
        const startIso = fromZonedTime(`${startDate}T00:00:00`, timezone).toISOString();
        const endIso = fromZonedTime(`${endDate}T23:59:59`, timezone).toISOString();
        axios.get(`/api/measurements/byPlot/${plotId}`, {
            params: { start: startIso, end: endIso },
        })
            .then((res) => {
                if (cancelled) return;
                const points: ChartData[] = res.data
                    .filter((i: any) => i.sensorID === sensorId)
                    .map((i: any) => ({
                        timestamp: formatInTimeZone(new Date(i.time), timezone, 'yyyy-MM-dd HH:mm'),
                        value: parseFloat(i.data),
                    }))
                    .sort((a: ChartData, b: ChartData) =>
                        a.timestamp.localeCompare(b.timestamp)
                    );
                setChartData(points);
            })
            .catch((err) => console.error('Error fetching measurements:', err))
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    }, [plotId, sensorId, startDate, endDate, timezone]);

    return (
        <Dialog
            open={target !== null}
            onOpenChange={(open) => { if (!open) onClose(); }}
        >
            <DialogContent className="w-full max-w-[95vw] md:max-w-[1400px] h-[90vh] md:h-[800px] flex flex-col gap-2">
                <DialogHeader className="pb-0">
                    <DialogTitle>
                        {decodeCombined('[en]Measurement Data for Sensor[es]Datos de medición para el sensor', language)} {sensorId}
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col md:flex-row gap-2 items-start md:items-center px-2 md:px-4 py-2">
                    <span>{decodeCombined('[en]Range:[es]Rango:', language)}</span>
                    <input type="date" value={startDate} max={endDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border rounded px-2 py-1" />
                    <span>-</span>
                    <input type="date" value={endDate} min={startDate}
                        max={new Date().toISOString().slice(0, 10)}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border rounded px-2 py-1" />
                </div>
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <div className="flex justify-center items-center w-full h-full">
                        <ResponsiveContainer width="95%" height="90%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="timestamp" dy={15} />
                                <YAxis
                                    unit={sensor?.description ?? ''}
                                    domain={
                                        sensor?.typicalRange
                                            ? [sensor.typicalRange[0], sensor.typicalRange[1]]
                                            : [0, 'auto']
                                    }
                                    tickCount={6}
                                    tickFormatter={(value) => value.toLocaleString()}
                                    width={80}
                                />
                                <Tooltip
                                    formatter={(value: number) => [
                                        `${value.toFixed(2)} ${decodeCombined(sensor?.description ?? '', language)}`,
                                        decodeCombined(sensor?.name ?? '', language),
                                    ]}
                                />
                                <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: 20 }} />
                                <Line type="monotone" dataKey="value" name={decodeCombined(sensor?.name ?? '', language)} stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};
