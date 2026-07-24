import { Page } from '@playwright/test'

export class Navbar {
    constructor(private page: Page){}

    async clickOrderLookupLink(){
        await this.page.getByRole('link', { name: 'Consultar Pedido'}).click()
    }
}