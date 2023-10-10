using LibreHardwareMonitor.Hardware;

namespace NessHardwareMonitorWeb.Models
{
    public class Hardware
    {
        public Hardware(IHardware hardware)
        {
            Name = hardware.Name;
            SubHardware = hardware.SubHardware.Select(sh => new Hardware(sh));
            Sensors = hardware.Sensors.Select(sh => new Sensor(sh));
        }

        public string Name { get; set; } = string.Empty;

        public IEnumerable<Hardware> SubHardware { get; set; } = Enumerable.Empty<Hardware>();

        public IEnumerable<Sensor> Sensors { get; set; } = Enumerable.Empty<Sensor>();
    }
}
