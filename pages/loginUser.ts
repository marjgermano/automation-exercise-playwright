import { Page, Locator } from '@playwright/test';

export class LoginUser {
    readonly page: Page;
    readonly loginEmail: Locator;
    readonly loginPassword: Locator;
    readonly loginBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginEmail = page.getByTestId('login-email');
        this.loginPassword = page.getByTestId('login-password');
        this.loginBtn = page.getByRole('button', { name: 'Login' });
    }

    async login(email: string, pass: string) {
        await this.loginEmail.fill(email);
        await this.loginPassword.fill(pass);
        await this.loginBtn.click();
    }
}