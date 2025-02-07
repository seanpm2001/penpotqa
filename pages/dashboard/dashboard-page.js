const { expect } = require('@playwright/test');
const { BasePage } = require('../base-page');

exports.DashboardPage = class DashboardPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    //Files
    this.numberOfFilesText = page.locator(
      'div[class*="project-name-wrapper"] span[class*="projects__info"]',
    );
    this.fileTile = page.locator(
      'div[class*="dashboard-grid"] div[class*="grid-item-th"]',
    );
    this.fileNameTitle = page.locator('div[class*="item-info"] h3');
    this.deleteFileMenuItem = page.locator('a[data-test="file-delete"]');
    this.deleteFileButton = page.locator(
      'input[value="Delete files"],input[value="Delete file"]',
    );
    this.createFileButtonPlaceholder = page.locator(
      'div[class*="dashboard-grid"] button[class*="create-new"]',
    );
    this.createFileButtonTitlePanel = page.locator(
      'button[data-test="project-new-file"]',
    );
    this.renameFileMenuItem = page.locator('a[data-test="file-rename"]');
    this.duplicateFileMenuItem = page.locator('a[data-test="file-duplicate"]');
    this.addFileAsSharedLibraryMenuItem = page.locator(
      'a[data-test="file-add-shared"]',
    );
    this.addFileAsSharedLibraryButton = page.locator(
      'input[value="Add as Shared Library"]',
    );
    this.sharedLibraryIcon = page.locator('svg[class="icon-library"]');
    this.delFileAsSharedLibraryMenuItem = page.locator(
      'a[data-test="file-del-shared"]',
    );
    this.delFileAsSharedLibraryButton = page.locator('input[value="Unpublish"]');
    this.downloadFilePenpotMenuItem = page.locator(
      'a[data-test="download-binary-file"]',
    );
    this.downloadFileStandardMenuItem = page.locator(
      'a[data-test="download-standard-file"]',
    );
    this.dashboardSection = page.locator('[class="main_ui_dashboard__dashboard"]');
    this.downloadFileTickIcon = page.locator('svg[class="icon-tick-refactor"]');
    this.downloadFileCloseButton = page.locator('input[value="Close"]');
    this.fileNameInput = page.locator('div[class*="edit-wrapper"]');
    this.fileOptionsMenuButton = page.locator(
      'div[class*="project-th-icon"] svg[class="icon-actions"]',
    );
    this.headerOptionsMenuButton = page.locator(
      'div[class*="dashboard-header-actions"] svg[class="icon-actions"]',
    );

    //Projects
    this.addProjectButton = page.locator('button[data-test="new-project-button"]');
    this.projectNameInput = page.locator(
      'div[class*="project-name-wrapper"] div[class*="edit-wrapper"]',
    );
    this.projectNameTitle = page.locator('div[class*="project-name-wrapper"] h2');
    this.deleteProjectMenuItem = page.locator('a[data-test="project-delete"]');
    this.deleteProjectButton = page.locator(
      'input[value="Delete files"],input[value="Delete project"]',
    );
    this.renameProjectMenuItem = page.locator('a[data-test="project-rename"]');
    this.duplicateProjectMenuItem = page.locator('a[data-test="project-duplicate"]');
    this.pinUnpinProjectButton = page.locator('button[alt="Pin/Unpin"] svg');
    this.projectOptionsMenuButton = page.locator(
      'button[data-test="project-options"]',
    );
    this.projectsSidebarItem = page.locator('li:has-text("Projects")');
    this.draftsSidebarItem = page.locator('li:has-text("Drafts")');
    this.librariesSidebarItem = page.locator('li:has-text("Libraries")');
    this.pinnedProjectsSidebarItem = page.locator(
      'div[data-test="pinned-projects"]',
    );
    this.searchInput = page.locator('#search-input');
    this.projectOptions = page.locator('[data-test="project-options"]');

    // Import files
    this.fileImport = page.locator('a[data-test="file-import"]');
    this.modalTitle = page.locator('h2[class*="modal-title"]');
    this.modalCancelButton = page.locator(
      'div[class*="modal-footer"] input[class*="cancel-button"]',
    );
    this.modalAcceptButton = page.locator(
      'div[class*="modal-footer"] input[class*="accept-btn"]',
    );
    this.feedbackBanner = page.locator('div[class*="feedback-banner"]');
    this.feedbackBannerMessage = page.locator(
      'div[class*="feedback-banner"] div[class*="message"]',
    );
    this.importErrorMessage = page.locator('div[class*="error-message"]');

    //Fonts
    this.fontsSidebarItem = page.locator('li:has-text("Fonts")');
    this.uploadFontSelector = page.locator('#font-upload');
    this.uploadFontButton = page.locator('button:text-is("Upload")');
    this.fontNameTableCell = page.locator(
      'div[class*="installed-fonts"] div[class*="table-row"] div[class*="dashboard_fonts__family"]',
    );
    this.fontStyleTableCell = page.locator(
      'div[class*="installed-fonts"] div[class*="table-row"] div[class*="dashboard_fonts__variants"]',
    );
    this.fontOptionsMenuButton = page.locator(
      'div[class*="fonts__options"] svg[class="icon-actions"]',
    );
    this.editFontMenuItem = page.locator('a[data-test="font-edit"]');
    this.deleteFontMenuItem = page.locator('a[data-test="font-delete"]');
    this.deleteFontButton = page.locator('input[value="Delete"]');
    this.fontsTablePlaceholder = page.locator(
      'div[class*="fonts-placeholder"] div[class*="label"]',
    );
    this.fontNameInput = page.locator('div[class*="table-row"] input[type="text"]');
    this.saveFontButton = page.locator('button:text-is("Save")');
    this.searchFontInput = page.locator('input[placeholder="Search font"]');
    this.fontFormatError = page.locator('.main_ui_messages__content span');

    //Libraries & Templates
    this.noLibrariesPlacelder = page.locator('div[data-test="empty-placeholder"] p');
  }

  async createFileViaPlaceholder() {
    await this.createFileButtonPlaceholder.first().click();
  }

  async createFileViaTitlePanel() {
    await this.createFileButtonTitlePanel.first().click({ force: true });
  }

  async deleteFileViaRightclick() {
    await this.fileTile.click({ button: 'right' });
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
    let counter = 0;
    while (await this.fileTile.count()) {
      await this.fileTile.first().click({ button: 'right' });
      await this.deleteFileMenuItem.click();
      await this.deleteFileButton.click();
      counter++;
    }
    await expect(this.fileTile).toHaveCount(0);
  }

  async deleteFilesIfExist() {
    await this.numberOfFilesText.waitFor();
    const text = (await this.numberOfFilesText.innerText()).valueOf();
    if (!text.includes('0 files')) {
      await this.deleteFiles();
    }
  }

  async deleteProjectViaRightclick() {
    await this.projectNameTitle.first().click({ button: 'right' });
    await this.deleteProjectMenuItem.click();
    await this.deleteProjectButton.click();
  }

  async deleteProjectViaOptionsIcon() {
    await this.projectNameTitle.first().hover();
    await this.projectOptionsMenuButton.first().click({ force: true });
    await this.deleteProjectMenuItem.click();
    await this.deleteProjectButton.click();
  }

  async deleteProjectsIfExist() {
    for (const project of await this.projectNameTitle.elementHandles()) {
      const name = (await project.innerText()).valueOf();
      if (!name.includes('Drafts')) {
        await project.click({ button: 'right' });
        await this.deleteProjectMenuItem.click();
        await this.deleteProjectButton.click();
      }
    }
    await expect(this.projectNameTitle).toHaveCount(1);
  }

  async waitForPageLoaded() {
    await this.page.waitForLoadState('networkidle');
  }

  async isDashboardOpenedAfterLogin() {
    await this.page.waitForURL(/.*dashboard\/team/, { waitUntil: 'load' });
  }

  async checkNumberOfFiles(numberOfFiles) {
    await expect(this.numberOfFilesText.first()).toHaveText(numberOfFiles);
  }

  async renameFile(newFileName, byRightClick = true) {
    let text = await this.fileNameTitle.textContent();
    if (byRightClick) {
      await this.fileTile.click({ button: 'right' });
    } else {
      await this.clickOnFileOptions();
    }
    await this.renameFileMenuItem.click();
    await this.fileNameInput.click();
    for (let i = 0; i <= text.length; i++) {
      await this.page.keyboard.press('Backspace');
    }
    await this.fileNameInput.pressSequentially(newFileName);
    await this.page.keyboard.press('Enter');
    await this.isFilePresent(newFileName);
  }

  async isFilePresent(fileName) {
    await expect(this.fileNameTitle).toHaveText(fileName);
  }

  async duplicateFileViaRightclick() {
    await this.fileTile.click({ button: 'right' });
    await this.duplicateFileMenuItem.click();
  }

  async duplicateFileViaOptionsIcon() {
    await this.clickOnFileOptions();
    await this.duplicateFileMenuItem.click();
  }

  async addFileAsSharedLibraryViaRightclick() {
    await this.fileTile.click({ button: 'right' });
    await this.addFileAsSharedLibraryMenuItem.click();
    await this.addFileAsSharedLibraryButton.click();
  }

  async clickOnFileOptions() {
    await this.fileTile.first().hover();
    await this.fileOptionsMenuButton.first().hover();
    await this.fileOptionsMenuButton.first().click();
  }

  async addFileAsSharedLibraryViaOptionsIcon() {
    await this.clickOnFileOptions();
    await this.addFileAsSharedLibraryMenuItem.click();
    await this.addFileAsSharedLibraryButton.click();
  }

  async deleteFileAsSharedLibraryViaRightclick() {
    await this.fileTile.click({ button: 'right' });
    await this.delFileAsSharedLibraryMenuItem.click();
    await this.delFileAsSharedLibraryButton.click();
  }

  async deleteFileAsSharedLibraryViaOptionsIcon() {
    await this.clickOnFileOptions();
    await this.delFileAsSharedLibraryMenuItem.click();
    await this.delFileAsSharedLibraryButton.click();
  }

  async isSharedLibraryIconDisplayed() {
    await expect(this.sharedLibraryIcon).toBeVisible();
  }

  async isSharedLibraryIconNotDisplayed() {
    await expect(this.sharedLibraryIcon).not.toBeVisible();
  }

  async downloadFileViaRightClick(isStandardFile = true) {
    await this.fileTile.click({ button: 'right' });
    if (isStandardFile) {
      await this.downloadFileStandardMenuItem.click();
    } else {
      await this.downloadFilePenpotMenuItem.click();
    }
    await this.page.waitForEvent('download');
    await expect(this.downloadFileTickIcon).toBeVisible();
    await this.downloadFileCloseButton.click();
  }

  async downloadFileViaOptionsIcon(isStandardFile = true) {
    await this.clickOnFileOptions();
    if (isStandardFile) {
      await this.downloadFileStandardMenuItem.click();
    } else {
      await this.downloadFilePenpotMenuItem.click();
    }
    await this.page.waitForEvent('download');
    await expect(this.downloadFileTickIcon).toBeVisible();
    await this.downloadFileCloseButton.click();
  }

  async clickAddProjectButton() {
    await this.addProjectButton.click();
  }

  async setProjectName(newProjectName) {
    await this.projectNameInput.pressSequentially(newProjectName);
    await this.page.keyboard.press('Enter');
  }

  async isProjectTitleDisplayed(newProjectName) {
    await expect(this.projectNameTitle.first()).toHaveText(newProjectName);
  }

  async createProject(name) {
    await this.clickAddProjectButton();
    await this.setProjectName(name);
    await this.isProjectTitleDisplayed(name);
  }

  async renameProjectViaRightclick(newProjectName) {
    let text = await this.projectNameTitle.first().textContent();
    await this.projectNameTitle.first().click({ button: 'right' });
    await this.renameProjectMenuItem.click();
    await this.projectNameInput.click();
    for (let i = 0; i <= text.length; i++) {
      await this.page.keyboard.press('Backspace');
    }
    await this.projectNameInput.pressSequentially(newProjectName);
    await this.page.keyboard.press('Enter');
    await expect(this.projectNameTitle.first()).toHaveText(newProjectName);
  }

  async renameProjectViaOptionsIcon(newProjectName) {
    let text = await this.projectNameTitle.first().textContent();
    await this.projectNameTitle.first().hover();
    await this.projectOptionsMenuButton.first().click({ force: true });
    await this.renameProjectMenuItem.click();
    await this.projectNameInput.click();
    for (let i = 0; i <= text.length; i++) {
      await this.page.keyboard.press('Backspace');
    }
    await this.projectNameInput.pressSequentially(newProjectName);
    await this.page.keyboard.press('Enter');
    await expect(this.projectNameTitle.first()).toHaveText(newProjectName);
  }

  async duplicateProjectViaRightclick() {
    await this.projectNameTitle.first().click({ button: 'right' });
    await this.duplicateProjectMenuItem.click();
  }

  async duplicateProjectViaOptionsIcon() {
    await this.projectNameTitle.first().hover();
    await this.projectOptionsMenuButton.first().click({ force: true });
    await this.duplicateProjectMenuItem.click();
  }

  async openSidebarItem(item) {
    switch (item) {
      case 'Projects':
        await this.projectsSidebarItem.click();
        break;
      case 'Drafts':
        await this.draftsSidebarItem.click();
        break;
      case 'Fonts':
        await this.fontsSidebarItem.click();
        break;
      case 'Libraries':
        await this.librariesSidebarItem.click();
        break;
    }
    await expect(this.header).toHaveText(item);
  }

  async openProjectFromLeftSidebar(projectName) {
    const projectSel = await this.page.locator(
      `div[data-test="pinned-projects"] span[class*="element-title"]:has-text("${projectName}")`,
    );
    await projectSel.click();
    await this.isHeaderDisplayed(projectName);
  }

  async checkNoLibrariesExist() {
    await expect(this.noLibrariesPlacelder).toContainText(
      'Files added to Libraries will appear here.',
    );
  }

  async clickUnpinProjectButton() {
    await this.projectNameTitle.first().hover();
    await expect(this.pinUnpinProjectButton).toHaveClass('icon-pin-fill');
    await this.pinUnpinProjectButton.click();
    await expect(this.pinUnpinProjectButton).toHaveClass('icon-pin');
  }

  async clickPinProjectButton() {
    await this.projectNameTitle.first().hover();
    await expect(this.pinUnpinProjectButton).toHaveClass('icon-pin');
    await this.pinUnpinProjectButton.click();
    await expect(this.pinUnpinProjectButton).toHaveClass('icon-pin-fill');
  }

  async checkPinnedProjectsSidebarItem(text) {
    await expect(this.pinnedProjectsSidebarItem).toHaveText(text);
  }

  async search(text) {
    await this.searchInput.pressSequentially(text);
  }

  async uploadFont(filePath) {
    await this.uploadFontSelector.setInputFiles(filePath);
    await this.uploadFontButton.click();
    await this.uploadFontButton.waitFor({ state: 'hidden' });
  }

  async uploadFontWithInvalidFormat(filePath) {
    const fontName = filePath.split('/')[1];
    const warning = `The font '${fontName}' could not be loaded`;
    await this.uploadFontSelector.setInputFiles(filePath);
    await expect(this.fontFormatError).toHaveText(warning);
  }

  async isFontExists(fontName, fontStyle) {
    await expect(this.fontNameTableCell).toHaveText(fontName);
    await expect(this.fontStyleTableCell).toHaveText(fontStyle);
  }

  async isFontNotExist(fontName) {
    await expect(this.fontNameTableCell).not.toHaveText(fontName);
  }

  async deleteFont() {
    await this.fontOptionsMenuButton.click();
    await this.deleteFontMenuItem.click();
    await this.deleteFontButton.click();
  }

  async isFontsTablePlaceholderDisplayed(text) {
    await expect(this.fontsTablePlaceholder).toHaveText(text);
  }

  async editFont(newFontName) {
    await this.fontOptionsMenuButton.click();
    await this.editFontMenuItem.click();
    await this.fontNameInput.fill(newFontName);
    await this.saveFontButton.click();
  }

  async searchFont(fontName) {
    await this.searchFontInput.pressSequentially(fontName);
    await expect(this.fontNameTableCell).toHaveCount(1);
  }

  async openFile() {
    await this.fileTile.dblclick();
  }

  async importFileProcessingSuccess(file) {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.fileImport.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(file);
    await expect(this.modalTitle).toBeVisible();
    await expect(this.modalTitle).toHaveText('Import Penpot files');
    await this.modalAcceptButton.click();
    await this.feedbackBanner.waitFor();
    await expect(this.feedbackBannerMessage).toHaveText(
      '1 file has been imported successfully.',
    );
    await this.modalAcceptButton.click();
  }

  async importFileProcessingError(file) {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.fileImport.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(file);
    await expect(this.modalTitle).toBeVisible();
    await expect(this.modalTitle).toHaveText('Import Penpot files');
    await expect(this.modalAcceptButton).toBeVisible();
    await expect(this.modalAcceptButton).toBeDisabled();

    await expect(this.importErrorMessage).toHaveText(
      "Oops! We couldn't import this file",
    );
    await this.modalCancelButton.click();
  }

  async importFile(file) {
    await this.projectOptions.click();
    await this.importFileProcessingSuccess(file);
  }

  async importFileFromProjectPage(file) {
    await this.headerOptionsMenuButton.click();
    await this.importFileProcessingSuccess(file);
  }

  async importFileWithInvalidFormat(file) {
    await this.headerOptionsMenuButton.click();
    await this.importFileProcessingError(file);
  }

  async importAndOpenFile(file) {
    await this.importFile(file);
    await this.openFile();
  }
};
