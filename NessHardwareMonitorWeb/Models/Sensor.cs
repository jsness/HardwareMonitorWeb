using LibreHardwareMonitor.Hardware;

namespace NessHardwareMonitorWeb.Models
{
    public class Sensor
    {
        public Sensor(ISensor sensor)
        {
            Name = sensor.Name;
            Value = sensor.Value;
            SensorType = sensor.SensorType.ToString();

            string format = "";
            switch (SensorType)
            {
                case "Voltage": format = "{1:F2} V"; break;
                case "Current": format = "{1:F2} A"; break;
                case "Clock": format = "{1:F0} MHz"; break;
                case "Load": format = "{1:F1} %"; break;
                case "Temperature": format = "{1:F1} °C"; break;
                case "Fan": format = "{1:F0} RPM"; break;
                case "Flow": format = "{1:F0} L/h"; break;
                case "Control": format = "{1:F1} %"; break;
                case "Level": format = "{1:F1} %"; break;
                case "Power": format = "{1:F0} W"; break;
                case "Data": format = "{1:F0} GB"; break;
                case "Factor": format = "{1:F3} GB"; break;
                case "Energy": format = "{0:F0} mWh"; break;
                case "Noise": format = "{0:F0} dBA"; break;
            }

            DisplayValue = string.Format(format, Name, Value);
        }

        public string Name { get; set; } = string.Empty;

        public float? Value { get; set; } = 0;

        public string SensorType { get; set; } = string.Empty;

        public string DisplayValue { get; set; } = string.Empty;
    }
}
