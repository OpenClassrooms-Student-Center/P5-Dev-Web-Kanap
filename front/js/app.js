class App {
    constructor() {
        this.$kanapWrapper = document.querySelector('.items')
        this.kanaps = new KanapApi('http://localhost:3000/api/products')
    }

    async main() {
        const itemsData = await this.kanaps.get()
        const KanapsItems = itemsData.map(data => new KanapFactory(data))

        KanapsItems.forEach(kanap => {
            const Template = new KanapCard(kanap)
            this.$kanapWrapper.appendChild(
                Template.createKanapCard()
            )
        })
    }
}

const app = new App()
app.main()
