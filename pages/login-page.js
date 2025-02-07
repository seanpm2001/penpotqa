const { expect } = require('@playwright/test');
const { BasePage } = require('./base-page');

exports.LoginPage = class LoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    this.pageTitle = page.locator('h1[data-test="login-title"]');
    this.emailInput = page.locator('#email');
    this.pwdInput = page.locator('#password');
    this.loginButton = page.locator('button[data-test="login-submit"]');
    this.emailInputError = page.locator('div[data-test="-error"]');
    this.section = page.locator('section[class="auth-content"]');
    this.loginErrorBanner = page.locator('div[data-test="login-banner"]');
    this.createAccountLink = page.locator('a:has-text("Create an account")');
  }

  async goto() {
    await this.page.goto('/#/auth/login');
  }

  async enterEmail(loginEmail) {
    await this.emailInput.fill(loginEmail);
  }

  async enterPwd(loginPwd) {
    await this.pwdInput.fill(loginPwd);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async clickPwdInput() {
    await this.pwdInput.click();
  }

  async isEmailInputErrorDisplayed(error) {
    await expect(this.emailInputError).toHaveText(error);
  }

  async isLoginButtonDisplayed() {
    await expect(this.loginButton).toBeVisible();
  }

  async isLoginButtonDisabled() {
    await expect(this.loginButton).toBeDisabled();
  }

  async clickHeader() {
    await this.pageTitle.click();
  }

  async isLoginErrorMessageDisplayed(message) {
    await expect(this.loginErrorBanner).toHaveText(message);
  }

  async clickOnCreateAccount() {
    await this.createAccountLink.click();
  }

  async isLoginPageOpened() {
    await expect(this.pageTitle).toHaveText('Great to see you again!');
  }
};
