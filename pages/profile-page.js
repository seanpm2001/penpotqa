const { expect } = require('@playwright/test');
const { BasePage } = require('./base-page');

exports.ProfilePage = class ProfilePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    //Account
    this.profileMenuButton = page.locator('div[data-test="profile-btn"]');
    this.yourAccountMenuItem = page.locator('li[data-test="profile-profile-opt"]');
    this.logoutMenuItem = page.locator('li[data-test="logout-profile-opt"]');
    this.giveFeedbackMenuItem = page.locator('li[data-test="feedback-profile-opt"]');
    this.backToDashboardBtn = page.locator('div[class*="back-to-dashboard"]');

    //Profile
    this.profileNameInput = page.locator('#fullname');
    this.profileEmailInput = page.locator('#email');
    this.saveSettingsButton = page.locator('button:has-text("Save settings")');
    this.profileImageInput = page.locator('input[data-test="profile-image-input"]');
    this.profileAvatarBlock = page.locator(
      'div.main_ui_settings_profile__form-container',
    );

    //Feedback
    this.feedbackSubjectInput = page.locator('#subject');
    this.feedbackDescriptionInput = page.locator('textarea');
    this.sendFeedbackButton = page.locator('button[name="submit"]');

    //Password
    this.passwordSidebarOption = page.locator('li span:text-is("Password")');
    this.passwordFormHeader = page.locator(
      'div[class*="password__form-container"] h2',
    );
    this.passwordOldInput = page.locator('#password-old');
    this.passwordNewInput = page.locator('input[label="New password"]');
    this.passwordConfirmInput = page.locator('input[label="Confirm password"]');
    this.updateSettingsBtn = page.locator('button[data-test="submit-password"]');
    this.passwordInputError = page.locator('div[data-test="-error"]');
  }

  async openYourAccountPage() {
    await this.profileMenuButton.click();
    await this.yourAccountMenuItem.click();
  }

  async openGiveFeedbackPage() {
    await this.profileMenuButton.click();
    await this.giveFeedbackMenuItem.click();
  }

  async openPasswordPageInAccount() {
    await this.passwordSidebarOption.click();
    await expect(this.passwordFormHeader).toHaveText('Change password');
  }

  async enterCurrentPassword(value) {
    await this.passwordOldInput.fill(value);
  }

  async enterNewPassword(value) {
    await this.passwordNewInput.fill(value);
  }

  async enterConfirmPassword(value) {
    await this.passwordConfirmInput.fill(value);
  }

  async isPasswordInputErrorDisplayed(error) {
    await expect(this.passwordInputError).toHaveText(error);
  }

  async isUpdateSettingsBtnDisabled() {
    await expect(this.updateSettingsBtn).toBeDisabled();
  }

  async logout() {
    await this.profileMenuButton.click();
    await this.logoutMenuItem.click();
  }

  async changeProfileName(newName) {
    await this.clearInput(this.profileNameInput);
    await this.profileNameInput.fill(newName);
    await this.saveSettingsButton.click();
  }

  async enterSubjectToGiveFeedbackForm(text) {
    await this.feedbackSubjectInput.fill(text);
  }

  async enterDescriptionToGiveFeedbackForm(text) {
    await this.feedbackDescriptionInput.fill(text);
  }

  async clearSubjectInputInGiveFeedbackForm() {
    await this.clearInput(this.feedbackSubjectInput);
  }

  async clickSendFeedbackButton() {
    await this.sendFeedbackButton.click();
  }

  async isSendFeedbackButtonDisabled() {
    await expect(this.sendFeedbackButton).toBeDisabled();
  }

  async isAccountNameDisplayed(name) {
    await expect(this.profileMenuButton).toHaveText(name);
  }

  async uploadProfileImage(filePath) {
    await this.profileImageInput.setInputFiles(filePath);
  }

  async backToDashboardFromAccount() {
    await this.backToDashboardBtn.click();
    await this.isHeaderDisplayed('Projects');
  }
};
