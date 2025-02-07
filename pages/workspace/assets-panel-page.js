const { BasePage } = require('../base-page');
const { expect } = require('@playwright/test');

exports.AssetsPanelPage = class AssetsPanelPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    //Assets panel
    this.assetsTab = page.locator('div[data-id="assets"]');
    this.assetComponentLabel = page.locator(
      'div[class*="assets_components__grid-cell"]',
    );
    this.assetsSecondComponentLabel = page.locator(
      'div[class*="assets_components__grid-cell"] >>nth=1',
    );
    this.componentsGridOnAssetsTab = page.locator(
      'div[class*="assets_components__asset-grid"]',
    );
    this.componentsTitleBarOnAssetsTab = page.locator(
      'div[class*="components_title_bar"] span:text-is("Components")',
    );
    this.assetsPanel = page.locator('div[class*="assets-bar"]');
    this.assetsSectionName = page.locator(
      'span[class*="assets_common__section-name"]',
    );
    this.assetsSectionNumbers = page.locator(
      'span[class*="assets_common__num-assets"]',
    );
    this.renameFileLibraryMenuItem = page.locator('li:has-text("Rename")');
    this.deleteFileLibraryMenuItem = page.locator('li:has-text("Delete")');
    this.editFileLibraryMenuItem = page.locator('li:has-text("Edit")');
    this.createGroupFileLibraryMenuItem = page.locator('li:has-text("Group")');
    this.ungroupFileLibraryMenuItem = page.locator('li:has-text("Ungroup")');
    this.groupNameInput = page.locator('#asset-name');
    this.createGroupButton = page.locator('input[value="Create"]');
    this.renameGroupButton = page.locator('input[value="Rename"]');
    this.fileLibraryGroupTitle = page.locator('div[class*="group-title"]');
    this.fileLibraryListViewButton = page.locator('label[for="opt-list"] span');
    this.fileLibraryGridViewButton = page.locator('label[for="opt-grid"] span');
    this.addFileLibraryColorButton = page.locator(
      'button[class*="assets_colors__assets-btn"]',
    );
    this.fileLibraryColorsColorBullet = page.locator(
      'div[class*="assets_colors__bullet-block"]',
    );
    this.fileLibraryColorsColorTitle = page.locator('div[class*="name-block"]');
    this.fileLibraryColorsColorNameInput = page.locator(
      'input[class*="element-name"]',
    );
    this.addFileLibraryTypographyButton = page.locator(
      'button[class*="typographies__assets-btn"]',
    );
    this.minimizeFileLibraryTypographyButton = page.locator(
      'div[class*="typography__action-btn"]',
    );
    this.expandFileLibraryTypographyButton = page.locator(
      'div[class*="typography__element-set-actions"] button',
    );
    this.fileLibraryTypographyRecord = page.locator(
      'div[class*="typography-entry"]',
    );
    this.fontSelector = page.locator('div[class*="typography__font-option"]');
    this.fontSelectorSearchInput = page.locator('input[placeholder="Search font"]');
    this.fontSizeInput = page.locator('div[class*="font-size-select"] input');
    this.typographyNameInput = page.locator('input[class*="adv-typography-name"]');
    this.assetsTitleText = page.locator(
      'div[class*="asset-section"] span[class*="title-name"]',
    );
    this.assetsTypeButton = page.locator(
      'div[class*="assets-header"] button[class*="section-button"]',
    );
    this.assetsTypeDropdown = page.locator('ul[class*="context-menu-items"]');
    this.assetsTypeAll = page.locator('#section-all');
    this.assetsTypeComponents = page.locator('#section-components');
    this.assetsTypeColors = page.locator('#section-color');
    this.assetsTypeTypographies = page.locator('#section-typography');
    this.duplicateMainComponentMenuItem = page.locator(
      'li:has-text("Duplicate main")',
    );
    this.showMainComponentMenuItem = page.locator(
      'li:has-text("Show main component")',
    );
    this.fileLibraryComponentNameInput = page.locator(
      'div[class*="assets_components__editing"] input',
    );
    this.fontRecordOnTypographiesBottomPanel = page.locator(
      'div[class="typography-item"]',
    );

    //Assets panel - Libraries
    this.addAsSharedLibraryButton = page.locator(
      'input[value="Add as Shared Library"]',
    );
    this.removeAsSharedLibraryButton = page.locator('input[value="Unpublish"]');
    this.sharedLibraryBadge = page.locator('span[class*="shared-badge"]');
  }

  async clickAssetsTab() {
    await this.assetsTab.click();
  }

  async isSecondComponentAddedToFileLibrary() {
    await expect(this.assetsSecondComponentLabel).toBeVisible();
  }

  async isComponentNotAddedToFileLibraryComponents() {
    await expect(this.assetComponentLabel).not.toBeVisible();
  }

  async deleteFileLibraryComponents() {
    await this.assetComponentLabel.click({ button: 'right' });
    await this.deleteFileLibraryMenuItem.click();
  }

  async isAssetsSectionNameDisplayed(name, amount) {
    await expect(this.assetsSectionName).toHaveText(name);
    await expect(this.assetsSectionNumbers).toHaveText(amount);
  }

  async isFileLibraryGroupCreated(groupName) {
    await expect(this.fileLibraryGroupTitle).toHaveText(groupName);
  }

  async isFileLibraryGroupRemoved() {
    await expect(this.fileLibraryGroupTitle).not.toBeVisible();
  }

  async renameGroupFileLibrary(newGroupName) {
    await this.fileLibraryGroupTitle.click({ button: 'right' });
    await this.renameFileLibraryMenuItem.click();
    await this.groupNameInput.fill(newGroupName);
    await this.renameGroupButton.click();
  }

  async ungroupFileLibrary() {
    await this.fileLibraryGroupTitle.click({ button: 'right' });
    await this.ungroupFileLibraryMenuItem.click();
  }

  async clickFileLibraryListViewButton() {
    await this.fileLibraryListViewButton.click();
  }

  async clickFileLibraryGridViewButton() {
    await this.fileLibraryGridViewButton.click();
  }

  async clickAddFileLibraryColorButton() {
    await this.addFileLibraryColorButton.click();
  }

  async isColorAddedToFileLibraryColors(colorName) {
    await expect(this.fileLibraryColorsColorBullet).toBeVisible();
    await expect(this.fileLibraryColorsColorTitle).toHaveText(colorName);
  }

  async isColorNotAddedToFileLibraryColors() {
    await expect(this.fileLibraryColorsColorBullet).not.toBeVisible();
  }

  async editFileLibraryColor() {
    await this.fileLibraryColorsColorBullet.click({ button: 'right' });
    await this.editFileLibraryMenuItem.click();
  }

  async renameFileLibraryColor(newColorName) {
    await this.fileLibraryColorsColorBullet.click({ button: 'right' });
    await this.renameFileLibraryMenuItem.click();
    await this.fileLibraryColorsColorNameInput.fill(newColorName);
  }

  async deleteFileLibraryColor() {
    await this.fileLibraryColorsColorBullet.click({ button: 'right' });
    await this.deleteFileLibraryMenuItem.click();
  }

  async clickFileLibraryColorsColorBullet() {
    await this.fileLibraryColorsColorBullet.click({ delay: 500 });
  }

  async clickAndPressAltFileLibraryColorsColorBullet() {
    await this.fileLibraryColorsColorBullet.click({
      delay: 500,
      modifiers: ['Alt'],
    });
  }

  async clickAddFileLibraryTypographyButton() {
    await this.addFileLibraryTypographyButton.click();
  }

  async minimizeFileLibraryTypography() {
    await this.minimizeFileLibraryTypographyButton.click();
  }

  async expandFileLibraryTypography() {
    await this.fileLibraryTypographyRecord.hover();
    await this.expandFileLibraryTypographyButton.click();
  }

  async editFileLibraryTypography() {
    await this.fileLibraryTypographyRecord.click({ button: 'right' });
    await this.editFileLibraryMenuItem.click();
  }

  async renameFileLibraryTypography(newName) {
    await this.fileLibraryTypographyRecord.click({ button: 'right' });
    await this.renameFileLibraryMenuItem.click();
    await this.typographyNameInput.fill(newName);
  }

  async deleteFileLibraryTypography() {
    await this.fileLibraryTypographyRecord.click({ button: 'right' });
    await this.deleteFileLibraryMenuItem.click();
  }

  async createGroupFileLibraryAssets(assetType, newGroupName) {
    let selector;
    switch (assetType) {
      case 'Colors':
        selector = this.fileLibraryColorsColorBullet;
        break;
      case 'Typographies':
        selector = this.fileLibraryTypographyRecord;
        break;
      case 'Components':
        selector = this.assetComponentLabel;
        break;
    }
    await selector.click({ button: 'right' });
    await this.createGroupFileLibraryMenuItem.click();
    await this.groupNameInput.fill(newGroupName);
    await this.createGroupButton.click();
  }

  async clickFileLibraryTypographiesTypographyRecord() {
    await this.fileLibraryTypographyRecord.click();
  }

  async selectFont(fontName) {
    await this.fontSelector.click();
    await this.fontSelectorSearchInput.fill(fontName);
    await this.page
      .locator(`div[class*="font-item"] span:has-text('${fontName}')`)
      .click();
  }

  async selectFontSize(value) {
    await this.fontSizeInput.fill(value);
  }

  async clickAddAsSharedLibraryButton() {
    await this.addAsSharedLibraryButton.click();
  }

  async clickRemoveAsSharedLibraryButton() {
    await this.removeAsSharedLibraryButton.click();
  }

  async isSharedLibraryBadgeVisible() {
    await expect(this.sharedLibraryBadge).toBeVisible();
  }

  async isSharedLibraryBadgeNotVisible() {
    await expect(this.sharedLibraryBadge).not.toBeVisible();
  }

  async dragComponentOnCanvas(x, y) {
    await this.assetComponentLabel.dragTo(this.viewport, {
      targetPosition: { x: x, y: y },
    });
  }

  async expandComponentsBlockOnAssetsTab() {
    if (!(await this.componentsGridOnAssetsTab.isVisible())) {
      await this.componentsTitleBarOnAssetsTab.click();
    }
    await expect(this.componentsGridOnAssetsTab).toBeVisible();
  }

  async isComponentAddedToFileLibraryComponents() {
    await expect(this.assetComponentLabel).toBeVisible();
  }

  async selectTypeFromAllAssetsDropdown(type) {
    await this.assetsTypeButton.click();
    await expect(this.assetsTypeDropdown).toBeVisible();
    switch (type) {
      case 'All assets':
        await this.assetsTypeAll.click();
        break;
      case 'Components':
        await this.assetsTypeComponents.click();
        break;
      case 'Colors':
        await this.assetsTypeColors.click();
        break;
      case 'Typographies':
        await this.assetsTypeTypographies.click();
        break;
    }
  }

  async duplicateFileLibraryComponent() {
    await this.assetComponentLabel.click({ button: 'right' });
    await this.duplicateMainComponentMenuItem.click();
  }

  async showFileLibraryMainComponent() {
    await this.assetComponentLabel.click({ button: 'right' });
    await this.showMainComponentMenuItem.click();
  }

  async renameFileLibraryComponent(newName) {
    await this.assetComponentLabel.click({ button: 'right' });
    await this.renameFileLibraryMenuItem.click();
    await this.fileLibraryComponentNameInput.fill(newName);
    await this.clickOnEnter();
  }
};
