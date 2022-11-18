const { expect } = require("@playwright/test");

exports.DashboardPage = class DashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.header = page.locator("h1");
    this.numberOfFilesText = page.locator(
      'div[class="project-name-wrapper"] span[class="info"]'
    );
    this.fileTile = page.locator('div[class="item-info"]');
    this.fileNameTitle = page.locator('div[class="item-info"] h3');
    this.deleteFileMenuItem = page.locator('a[data-test="file-delete"]');
    this.deleteFileButton = page.locator(
      'input[value="Delete files"],input[value="Delete file"]'
    );
    this.createFileButtonPlaceholder = page.locator(
      'button[class="create-new"]'
    );
    this.createFileButtonTitlePanel = page.locator(
      'a[data-test="project-new-file"]'
    );
    this.renameFileMenuItem = page.locator('a[data-test="file-rename"]');
    this.duplicateFileMenuItem = page.locator('a[data-test="file-duplicate"]');
    this.addFileAsSharedLibraryMenuItem = page.locator(
      'a[data-test="file-add-shared"]'
    );
    this.addFileAsSharedLibraryButton = page.locator(
      'input[value="Add as Shared Library"]'
    );
    this.sharedLibraryIcon = page.locator('svg[class="icon-library"]');
    this.delFileAsSharedLibraryMenuItem = page.locator(
      'a[data-test="file-del-shared"]'
    );
    this.delFileAsSharedLibraryButton = page.locator(
      'input[value="Unpublish"]'
    );
    this.downloadFilePenpotMenuItem = page.locator(
      'a[data-test="download-binary-file"]'
    );
    this.downloadFileStandardMenuItem = page.locator(
      'a[data-test="download-standard-file"]'
    );
    this.downloadFileTickIcon = page.locator('svg[class="icon-tick"]');
    this.downloadFileCloseButton = page.locator('input[value="Close"]');
    this.fileNameInput = page.locator('div[class="edit-wrapper"]');
    this.fileOptionsMenuButton = page.locator(
      'div[class="project-th-icon menu"] svg[class="icon-actions"]'
    );
    this.successMessage = page.locator('div[class="banner success fixed"]');
    this.addProjectButton = page.locator('a[data-test="new-project-button"]');
    this.projectNameInput = page.locator(
      'div[class="project-name-wrapper"] div[class="edit-wrapper"]'
    );
    this.projectNameTitle = page.locator(
      'div[class="project-name-wrapper"] h2'
    );
    this.deleteProjectMenuItem = page.locator('a[data-test="project-delete"]');
    this.deleteProjectButton = page.locator(
      'input[value="Delete files"],input[value="Delete project"]'
    );
    this.renameProjectMenuItem = page.locator('a[data-test="project-rename"]');
    this.duplicateProjectMenuItem = page.locator(
      'a[data-test="project-duplicate"]'
    );
    this.pinUnpinProjectButton = page.locator('span[alt="Pin/Unpin"]');
    this.projectNameInput = page.locator(
      'div[class="project-name-wrapper"] div[class="edit-wrapper"]'
    );
    this.projectOptionsMenuButton = page.locator(
      'a[data-test="project-options"] svg[class="icon-actions"]'
    );
    this.projectsSidebarItem = page.locator('li:has-text("Projects")');
    this.draftsSidebarItem = page.locator('li:has-text("Drafts")');
    this.fontsSidebarItem = page.locator('li:has-text("Fonts")');
    this.pinnedProjectsSidebarItem = page.locator(
      'div[data-test="pinned-projects"]'
    );
    this.searchInput = page.locator("#search-input");
    this.uploadFontSelector = page.locator("#font-upload");
    this.uploadFontButton = page.locator('button:has-text("Upload")');
    this.fontNameTableCell = page.locator(
      'div[class="font-item table-row"] div[class="table-field family"]'
    );
    this.fontStyleTableCell = page.locator(
      'div[class="font-item table-row"] div[class="table-field variants"]'
    );
    this.fontOptionsMenuButton = page.locator(
      'div[class="table-field options"] svg[class="icon-actions"]'
    );
    this.editFontMenuItem = page.locator('a[data-test="font-edit"]');
    this.deleteFontMenuItem = page.locator('a[data-test="font-delete"]');
    this.deleteFontButton = page.locator('input[value="Delete"]');
    this.fontsTablePlaceholder = page.locator(
      'div[class="fonts-placeholder"] div[class="label"]'
    );
    this.fontNameInput = page.locator(
      'div[class="font-item table-row"] input[type="text"]'
    );
    this.saveFontButton = page.locator('button:has-text("Save")');

    this.searchFontInput = page.locator("input[placeholder='Search font']");

    this.teamSelector = page.locator("div[class='current-team']");

    this.createNewTeamMenuItem = page.locator(
      "li[data-test='create-new-team']"
    );

    this.teamNameInput = page.locator("#name");

    this.createNewTeamButton = page.locator("input[value='Create new team']");
    this.teamMenuItem = page.locator("li[class='team-name']");
    this.teamOptionsMenuButton = page.locator(
      'div[class="switch-options"] svg[class="icon-actions"]'
    );
    this.deleteTeamMenuItem = page.locator('li[data-test="delete-team"]');
    this.deleteTeamButton = page.locator('input[value="Delete team"]');
  }

  async isHeaderDisplayed(title) {
    await expect(this.header).toBeVisible();
    await expect(this.header).toHaveText(title);
  }

  async createFileViaPlaceholder() {
    await this.createFileButtonPlaceholder.first().click();
  }

  async createFileViaTitlePanel() {
    await this.projectNameTitle.first().hover();
    await this.createFileButtonTitlePanel.first().click({ force: true });
  }

  async deleteFileViaRightclick() {
    await this.fileTile.click({ button: "right" });
    await this.deleteFileMenuItem.click();
    await this.deleteFileButton.click();
  }

  async deleteFileViaOptionsIcon() {
    await this.fileTile.first().hover();
    await this.fileOptionsMenuButton.first().hover();
    await this.fileOptionsMenuButton.first().click();
    await this.deleteFileMenuItem.click();
    await this.deleteFileButton.click();
  }

  async deleteFiles() {
    for (const el of await this.fileTile.elementHandles()) {
      await el.click({ button: "right" });
      await this.deleteFileMenuItem.click();
      await this.deleteFileButton.click();
    }
  }

  async deleteFilesIfExist() {
    const text = (await this.numberOfFilesText.innerText()).valueOf();
    if (!text.includes("0 files")) {
      await this.deleteFiles();
    }
  }
  async deleteProjectViaRightclick() {
    await this.projectNameTitle.first().click({ button: "right" });
    await this.deleteProjectMenuItem.click();
    await this.deleteProjectButton.click();
  }

  async deleteProjectViaOptionsIcon() {
    await this.projectNameTitle.first().hover();
    await this.projectOptionsMenuButton.first().click({ force: true });
    await this.deleteProjectMenuItem.click();
    await this.deleteProjectButton.click();
  }

  async deleteProjects() {
    for (const el of await this.projectNameTitle.elementHandles()) {
      const text = (await el.innerText()).valueOf();
      if (!text.includes("Drafts")) {
        await el.click({ button: "right" });
        await this.deleteProjectMenuItem.click();
        await this.deleteProjectButton.click();
      }
    }
  }

  async deleteProjectsIfExist() {
    const text = (await this.projectNameTitle.first().innerText()).valueOf();
    if (!text.includes("Drafts")) {
      await this.deleteProjects();
    }
  }

  async waitForPageLoaded() {
    await this.page.waitForLoadState("networkidle");
  }

  async checkNumberOfFiles(numberOfFiles) {
    await this.waitForPageLoaded();
    await expect(this.numberOfFilesText.first()).toHaveText(numberOfFiles);
  }

  async renameFileViaRightclick(newFileName) {
    await this.fileTile.click({ button: "right" });
    await this.renameFileMenuItem.click();
    await this.fileNameInput.type(newFileName);
    await this.page.keyboard.press("Enter");
    await this.isFileNameDisplayed(newFileName);
  }

  async renameFileViaOptionsIcon(newFileName) {
    await this.fileTile.first().hover();
    await this.fileOptionsMenuButton.first().hover();
    await this.fileOptionsMenuButton.first().click();
    await this.renameFileMenuItem.click();
    await this.fileNameInput.type(newFileName);
    await this.page.keyboard.press("Enter");
    await this.isFileNameDisplayed(newFileName);
  }

  async isFileNameDisplayed(fileName) {
    await expect(this.fileNameTitle).toHaveText(fileName);
  }

  async duplicateFileViaRightclick() {
    await this.fileTile.click({ button: "right" });
    await this.duplicateFileMenuItem.click();
  }

  async duplicateFileViaOptionsIcon() {
    await this.fileTile.first().hover();
    await this.fileOptionsMenuButton.first().hover();
    await this.fileOptionsMenuButton.first().click();
    await this.duplicateFileMenuItem.click();
  }

  async isSuccessMessageDisplayed(message) {
    await expect(this.successMessage).toHaveText(message);
  }

  async addFileAsSharedLibraryViaRightclick() {
    await this.fileTile.click({ button: "right" });
    await this.addFileAsSharedLibraryMenuItem.click();
    await this.addFileAsSharedLibraryButton.click();
  }

  async addFileAsSharedLibraryViaOptionsIcon() {
    await this.fileTile.first().hover();
    await this.fileOptionsMenuButton.first().hover();
    await this.fileOptionsMenuButton.first().click();
    await this.addFileAsSharedLibraryMenuItem.click();
    await this.addFileAsSharedLibraryButton.click();
  }

  async deleteFileAsSharedLibraryViaRightclick() {
    await this.fileTile.click({ button: "right" });
    await this.delFileAsSharedLibraryMenuItem.click();
    await this.delFileAsSharedLibraryButton.click();
  }

  async deleteFileAsSharedLibraryViaOptionsIcon() {
    await this.fileTile.first().hover();
    await this.fileOptionsMenuButton.first().hover();
    await this.fileOptionsMenuButton.first().click();
    await this.delFileAsSharedLibraryMenuItem.click();
    await this.delFileAsSharedLibraryButton.click();
  }

  async isSharedLibraryIconDisplayed() {
    await expect(this.sharedLibraryIcon).toBeVisible();
  }
  async isSharedLibraryIconNotDisplayed() {
    await expect(this.sharedLibraryIcon).not.toBeVisible();
  }

  async downloadPenpotFileViaRightclick() {
    await this.fileTile.click({ button: "right" });
    await this.downloadFilePenpotMenuItem.click();
    await this.page.waitForEvent("download");
    await expect(this.downloadFileTickIcon).toBeVisible();
    await this.downloadFileCloseButton.click();
  }

  async downloadPenpotFileViaOptionsIcon() {
    await this.fileTile.first().hover();
    await this.fileOptionsMenuButton.first().hover();
    await this.fileOptionsMenuButton.first().click();
    await this.downloadFilePenpotMenuItem.click();
    await this.page.waitForEvent("download");
    await expect(this.downloadFileTickIcon).toBeVisible();
    await this.downloadFileCloseButton.click();
  }

  async downloadStandardFileViaRightclick() {
    await this.fileTile.click({ button: "right" });
    await this.downloadFileStandardMenuItem.click();
    await this.page.waitForEvent("download");
    await expect(this.downloadFileTickIcon).toBeVisible();
    await this.downloadFileCloseButton.click();
  }

  async downloadStandardFileViaOptionsIcon() {
    await this.fileTile.first().hover();
    await this.fileOptionsMenuButton.first().hover();
    await this.fileOptionsMenuButton.first().click();
    await this.downloadFileStandardMenuItem.click();
    await this.page.waitForEvent("download");
    await expect(this.downloadFileTickIcon).toBeVisible();
    await this.downloadFileCloseButton.click();
  }

  async clickAddProjectButton() {
    await this.addProjectButton.click();
  }

  async setProjectName(newProjectName) {
    await this.projectNameInput.type(newProjectName);
    await this.page.keyboard.press("Enter");
  }

  async isProjectTitleDisplayed(newProjectName) {
    await expect(this.projectNameTitle.first()).toHaveText(newProjectName);
  }

  async renameProjectViaRightclick(newProjectName) {
    await this.projectNameTitle.first().click({ button: "right" });
    await this.renameProjectMenuItem.click();
    await this.projectNameInput.type(newProjectName);
    await this.page.keyboard.press("Enter");
    await expect(this.projectNameTitle.first()).toHaveText(newProjectName);
  }

  async renameProjectViaOptionsIcon(newProjectName) {
    await this.projectNameTitle.first().hover();
    await this.projectOptionsMenuButton.first().click({ force: true });
    await this.renameProjectMenuItem.click();
    await this.projectNameInput.type(newProjectName);
    await this.page.keyboard.press("Enter");
    await expect(this.projectNameTitle.first()).toHaveText(newProjectName);
  }

  async duplicateProjectViaRightclick() {
    await this.projectNameTitle.first().click({ button: "right" });
    await this.duplicateProjectMenuItem.click();
  }

  async duplicateProjectViaOptionsIcon() {
    await this.projectNameTitle.first().hover();
    await this.projectOptionsMenuButton.first().click({ force: true });
    await this.duplicateProjectMenuItem.click();
  }

  async clickSidebarItem(item) {
    switch (item) {
      case "Projects":
        await this.projectsSidebarItem.click();
        break;
      case "Drafts":
        await this.draftsSidebarItem.click();
        break;
      case "Fonts":
        await this.fontsSidebarItem.click();
        break;
    }
  }
  async clickPinUnpinProjectButton() {
    await this.projectNameTitle.first().hover();
    await this.waitForPageLoaded();
    await this.pinUnpinProjectButton.click();
    await this.waitForPageLoaded();
  }

  async checkPinnedProjectsSidebarItem(text) {
    await expect(this.pinnedProjectsSidebarItem).toHaveText(text);
  }

  async search(text) {
    await this.searchInput.type(text);
  }

  async uploadFont(filePath) {
    await this.uploadFontSelector.setInputFiles(filePath);
    await this.uploadFontButton.click();
    await expect(this.uploadFontButton).not.toBeVisible();
  }

  async isFontUploaded(fontName, fontStyle) {
    await expect(this.fontNameTableCell).toHaveText(fontName);
    await expect(this.fontStyleTableCell).toHaveText(fontStyle);
  }

  async deleteFont() {
    await this.fontOptionsMenuButton.click();
    await this.deleteFontMenuItem.click();
    await this.deleteFontButton.click();
  }

  async deleteFonts() {
    for (const el of await this.fontOptionsMenuButton.elementHandles()) {
      await el.click();
      await this.deleteFontMenuItem.click();
      await this.deleteFontButton.click();
    }
  }

  async deleteFontsIfExist() {
    const fontRecords = await this.page.$$('div[class="font-item table-row"]');
    if (fontRecords) await this.deleteFonts();
  }

  async isFontsTablePlaceholderDisplayed(text) {
    await expect(this.fontsTablePlaceholder).toHaveText(text);
  }

  async editFont(newFontName) {
    await this.fontOptionsMenuButton.click();
    await this.editFontMenuItem.click();
    await this.clearInput(this.fontNameInput);
    await this.fontNameInput.type(newFontName);
    await this.saveFontButton.click();
    await expect(this.fontNameTableCell).toHaveText(newFontName);
  }

  async clearInput(input) {
    await input.click();
    let text = await input.inputValue();
    for (let i = 0; i <= text.length; i++) {
      await this.page.keyboard.press("Backspace");
    }
  }

  async searchFont(fontName) {
    await this.searchFontInput.type(fontName);
    await expect(this.fontNameTableCell).toHaveText(fontName);
    await expect(this.fontNameTableCell).toHaveCount(1);
  }

  async createTeam(teamName) {
    await this.teamSelector.click();
    await this.createNewTeamMenuItem.click();
    await this.teamNameInput.fill(teamName);
    await this.createNewTeamButton.click();
  }

  async isTeamSelected(teamName) {
    await expect(this.teamSelector).toHaveText(teamName);
  }

  async deleteTeam(teamName) {
    await this.teamSelector.click();
    for (const el of await this.teamMenuItem.elementHandles()) {
      const text = (await el.innerText()).valueOf();
      if (text.includes(teamName)) {
        await el.click();
        await this.teamOptionsMenuButton.click();
        await this.deleteTeamMenuItem.click();
        await this.deleteTeamButton.click();
        await expect(this.teamSelector).toHaveText("Your Penpot");
      }
    }
  }

  async deleteTeamsIfExist() {
    await this.teamSelector.click();
    for (const el of await this.teamMenuItem.elementHandles()) {
      const text = (await el.innerText()).valueOf();
      if (!text.includes("Your Penpot")) {
        await el.click();
        await this.teamOptionsMenuButton.click();
        await this.deleteTeamMenuItem.click();
        await this.deleteTeamButton.click();
        await expect(this.teamSelector).toHaveText("Your Penpot");
        await this.teamSelector.click();
      }
    }
    await this.teamSelector.click();
  }

  async isTeamDeleted(teamName) {
    await this.teamSelector.click();
    for (const el of await this.teamMenuItem.elementHandles()) {
      const text = (await el.innerText()).valueOf();
      expect(text).not.toEqual(teamName);
    }
  }
};
