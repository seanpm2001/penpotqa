const { expect } = require('@playwright/test');
const { BasePage } = require('../base-page');

exports.PrototypePanelPage = class PrototypePanelPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    this.viewport = page.locator('div.viewport');
    this.prototypeTab = page.locator('div[data-id="prototype"]');
    this.prototypeArrowConnector = page.locator(
      'g[class="interactions"] path[fill="var(--color-primary)"] >>nth=0',
    );
    this.prototypeArrowSecondConnector = page.locator(
      'g[class="interactions"] path[fill="var(--color-primary)"] >>nth=1',
    );
    this.prototypePanelFlowNameText = page.locator('span[class*="flow-name-label"]');
    this.prototypePanelFlowNameInput = page.locator('input[class*="interactions"]');
    this.addInteractionButton = page.locator('button[class*="add-interaction-btn"]');
    this.removeSecondInteractionButton = page.locator(
      'button[class*="interactions__remove-btn"] >>nth=1',
    );
    this.firstInteractionRecord = page.locator(
      'div[class*="interactions-summary"] >>nth=0',
    );
    this.interactionDestinationField = page.locator(
      '//*[text()="Destination"]//parent::div//div[contains(@class, "custom-select")]',
    );
    this.removeFlowButton = page.locator('div[class*="remove-flow-btn"]');
  }

  async clickPrototypeTab() {
    await this.prototypeTab.click();
  }

  async dragAndDropPrototypeArrowConnector(x, y) {
    await this.prototypeArrowConnector.hover();
    await this.prototypeArrowConnector.dragTo(this.viewport, {
      force: false,
      targetPosition: { x: x, y: y },
    });
  }

  async isFlowNameDisplayedOnPrototypePanel(name) {
    await expect(this.prototypePanelFlowNameText).toHaveText(name);
  }

  async isFlowNameNotDisplayedOnPrototypePanel() {
    await expect(this.prototypePanelFlowNameText).not.toBeVisible();
  }

  async clickAddInteractionButton() {
    await this.addInteractionButton.click({ delay: 500 });
  }

  async isPrototypeArrowSecondConnectorDisplayed() {
    await expect(this.prototypeArrowSecondConnector).toBeVisible();
  }

  async isPrototypeArrowSecondConnectorNotDisplayed() {
    await expect(this.prototypeArrowSecondConnector).not.toBeVisible();
  }

  async clickRemoveSecondInteractionButton() {
    await this.removeSecondInteractionButton.click();
  }

  async clickFirstInteractionRecord() {
    await this.firstInteractionRecord.click();
  }

  async renameFlow(newName) {
    await this.prototypePanelFlowNameText.dblclick();
    await this.prototypePanelFlowNameInput.fill(newName);
    await this.clickOnEnter();
  }

  async clickRemoveFlowButton() {
    await this.removeFlowButton.click();
  }

  async selectInteractionDestination(value) {
    const optionSel = this.page.locator(
      `div[class*="interaction-type-select"] span:has-text("${value}")`,
    );
    await this.interactionDestinationField.click();
    await optionSel.click();
  }
};
