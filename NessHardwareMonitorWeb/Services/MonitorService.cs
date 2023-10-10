using LibreHardwareMonitor.Hardware;
using NessHardwareMonitorWeb.Visitors;
using NessHardware = NessHardwareMonitorWeb.Models.Hardware;

namespace NessHardwareMonitorWeb.Services
{
    public interface IMonitorService
    {
        IEnumerable<NessHardware> GetHardware();
    }

    public class MonitorService : IMonitorService
    {
        private Computer _computer;

        public MonitorService()
        {
            _computer = new Computer
            {
                IsCpuEnabled = true,
                IsGpuEnabled = true,
                IsMemoryEnabled = true,
                IsMotherboardEnabled = true,
                IsControllerEnabled = true,
                IsNetworkEnabled = true,
                IsStorageEnabled = true
            };
            _computer.Open();
        }

        public IEnumerable<NessHardware> GetHardware()
        {
            //Computer computer = new Computer
            //{
            //    IsCpuEnabled = true,
            //    IsGpuEnabled = true,
            //    IsMemoryEnabled = true,
            //    IsMotherboardEnabled = true,
            //    IsControllerEnabled = true,
            //    IsNetworkEnabled = true,
            //    IsStorageEnabled = true
            //};

            //computer.Open();
            _computer.Accept(new Visitor());
            var data = _computer.Hardware.Select(h => new NessHardware(h));

            //computer.Close();

            return data;
        }
    }
}
