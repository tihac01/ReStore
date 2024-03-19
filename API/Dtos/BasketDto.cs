namespace API.Dtos
{
    public class BasketDto
    {
        public int Id { get; set; }

        public string BuyerId { get; set; }

        public IEnumerable<BasketItemDto> Items { get; set; }
    }
}