using System.Text.Json.Serialization;

namespace NessHardwareMonitorWeb.Models
{
    public class SettingsDto
    {
        public int Id { get; set; }

        public string UserName { get; set; } = "Default";

        public IEnumerable<string> FilteredTypes { get; set; } = Enumerable.Empty<string>();

        public IEnumerable<string> PinnedKeys { get; set; } = Enumerable.Empty<string>();
    }
}
