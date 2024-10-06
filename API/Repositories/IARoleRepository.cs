public interface IARoleReporsitory
{
    IEnumerable<ARole> GetAllARoles();
    
    ARole GetARoleByID(string id);

    void AddARole(ARole aRole);

    void UpdateARole(ARole aRole);

    string DeleteARole(string id);
    ARole GetARoleByEmail(string email);
    ARole GetARoleByRole(string role);
}
