using LibreHardwareMonitor.Hardware;
using LiteDB;
using NessHardwareMonitorWeb.Models;
using NessHardwareMonitorWeb.Visitors;
using NessHardware = NessHardwareMonitorWeb.Models.Hardware;

namespace NessHardwareMonitorWeb.Services
{
    public interface IMonitorService
    {
        IEnumerable<NessHardware> GetHardware();
        SettingsDto? GetSettings(string userName);
        void SaveSettings(SettingsDto request);
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
            _computer.Accept(new Visitor());
            var data = _computer.Hardware.Select(h => new NessHardware(h));

            return data;
        }

        public void SaveSettings(SettingsDto request)
        {
            using var database = new LiteDatabase(@"C:\LiteDB\NessHardwareMonitor.db");
            var col = database.GetCollection<SettingsDto>();

            var existingEntry = col.Query()
                .Where(s => s.UserName.Equals(request.UserName, StringComparison.OrdinalIgnoreCase))
                .FirstOrDefault();

            if (existingEntry != null)
            {
                existingEntry.PinnedKeys = request.PinnedKeys;
                existingEntry.FilteredTypes = request.FilteredTypes;
                col.Update(existingEntry);
            }
            else
            {
                col.Insert(request);
            }
        }

        public SettingsDto? GetSettings(string userName)
        {
            using var database = new LiteDatabase(@"C:\LiteDB\NessHardwareMonitor.db");
            var col = database.GetCollection<SettingsDto>();

            return col.Query()
                .Where(s => s.UserName.Equals(userName, StringComparison.OrdinalIgnoreCase))
                .FirstOrDefault();
        }
    }
}
