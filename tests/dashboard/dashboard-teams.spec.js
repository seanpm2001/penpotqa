const { mainTest } = require('../../fixtures');
const { TeamPage } = require('../../pages/dashboard/team-page');
const { expect, test } = require('@playwright/test');
const { ProfilePage } = require('../../pages/profile-page');
const { DashboardPage } = require('../../pages/dashboard/dashboard-page');
const { MainPage } = require('../../pages/workspace/main-page');
const { random } = require('../../helpers/string-generator');

test.describe(() => {
  const team = random().concat('autotest');

  mainTest('DA-76 Create a team', async ({ page }) => {
    const teamPage = new TeamPage(page);
    await teamPage.createTeam(team);
    await teamPage.isTeamSelected(team);
  });

  test.afterEach(async ({ page }) => {
    const teamPage = new TeamPage(page);
    await teamPage.deleteTeam(team);
  });
});

test.describe(() => {
  const team1 = random().concat('QA Test team 1');
  const team2 = random().concat('QA Test team 2');

  mainTest('DA-77 Team.Switch between teams', async ({ page }) => {
    const teamPage = new TeamPage(page);
    await teamPage.createTeam(team1);
    await teamPage.isTeamSelected(team1);
    await teamPage.createTeam(team2);
    await teamPage.isTeamSelected(team2);
    await teamPage.switchTeam(team1);
    await teamPage.switchTeam(team2);
  });

  test.afterEach(async ({ page }) => {
    const teamPage = new TeamPage(page);
    await teamPage.deleteTeams([team1, team2]);
  });
});

test.describe(() => {
  const team = random().concat('autotest');

  mainTest(
    'DA-78 Team Invitations - open the form via Invitations tab',
    async ({ page }) => {
      const teamPage = new TeamPage(page);
      await teamPage.createTeam(team);
      await teamPage.isTeamSelected(team);
      await teamPage.openInvitationsPageViaOptionsMenu();
      await teamPage.clickInviteMembersToTeamButton();
      await teamPage.isInviteMembersPopUpHeaderDisplayed(
        'Invite members to the team',
      );
    },
  );

  test.afterEach(async ({ page }) => {
    const teamPage = new TeamPage(page);
    await teamPage.deleteTeam(team);
  });
});

test.describe(() => {
  const team = random().concat('autotest');

  mainTest(
    'DA-79 Team Invitations - open the form via Team Hero',
    async ({ page }) => {
      const teamPage = new TeamPage(page);
      await teamPage.createTeam(team);
      await teamPage.isTeamSelected(team);
      await teamPage.clickInviteMembersTeamHeroButton();
      await teamPage.isInviteMembersPopUpHeaderDisplayed(
        'Invite members to the team',
      );
    },
  );

  test.afterEach(async ({ page }) => {
    const teamPage = new TeamPage(page);
    await teamPage.deleteTeam(team);
  });
});

test.describe(() => {
  const team = random().concat('autotest');

  mainTest(
    'DA-80 Team Invitations invite via owner single invitation, editor',
    async ({ page }) => {
      const teamPage = new TeamPage(page);
      await teamPage.createTeam(team);
      await teamPage.isTeamSelected(team);
      await teamPage.openInvitationsPageViaOptionsMenu();
      await teamPage.clickInviteMembersToTeamButton();
      await teamPage.isInviteMembersPopUpHeaderDisplayed(
        'Invite members to the team',
      );
      await teamPage.enterEmailToInviteMembersPopUp('testeditor@test.com');
      await teamPage.clickSendInvitationButton();
      await teamPage.isSuccessMessageDisplayed('Invitation sent successfully');
      await teamPage.isInvitationRecordDisplayed(
        'testeditor@test.com',
        'Editor',
        'Pending',
      );
    },
  );

  test.afterEach(async ({ page }) => {
    const teamPage = new TeamPage(page);
    await teamPage.deleteTeam(team);
  });
});

test.describe(() => {
  const team = random().concat('autotest');

  mainTest(
    'DA-81 Team Invitations - invite via owner single invitation, admin',
    async ({ page }) => {
      const teamPage = new TeamPage(page);
      await teamPage.createTeam(team);
      await teamPage.isTeamSelected(team);
      await teamPage.openInvitationsPageViaOptionsMenu();
      await teamPage.clickInviteMembersToTeamButton();
      await teamPage.isInviteMembersPopUpHeaderDisplayed(
        'Invite members to the team',
      );
      await teamPage.selectInvitationRoleInPopUp('Admin');
      await teamPage.enterEmailToInviteMembersPopUp('testadmin@test.com');
      await teamPage.clickSendInvitationButton();
      await teamPage.isSuccessMessageDisplayed('Invitation sent successfully');
      await teamPage.isInvitationRecordDisplayed(
        'testadmin@test.com',
        'Admin',
        'Pending',
      );
    },
  );

  test.afterEach(async ({ page }) => {
    const teamPage = new TeamPage(page);
    await teamPage.deleteTeam(team);
  });
});

test.describe(() => {
  const team = random().concat('autotest');

  mainTest(
    'DA-89 Team.Invitations-fail to send invitation to existing team member',
    async ({ page }) => {
      const teamPage = new TeamPage(page);
      await teamPage.createTeam(team);
      await teamPage.isTeamSelected(team);
      await teamPage.openInvitationsPageViaOptionsMenu();
      await teamPage.clickInviteMembersToTeamButton();
      await teamPage.isInviteMembersPopUpHeaderDisplayed(
        'Invite members to the team',
      );
      await teamPage.enterEmailToInviteMembersPopUp(process.env.LOGIN_EMAIL);
      await teamPage.isSendInvitationBtnDisabled();
      await teamPage.isSendInvitationWarningExist(
        'Some emails are from current team members. Their invitations will not be sent.',
      );
    },
  );

  test.afterEach(async ({ page }) => {
    const teamPage = new TeamPage(page);
    await teamPage.deleteTeam(team);
  });
});

test.describe(() => {
  const team = random().concat('autotest');

  mainTest(
    'DA-90 Team Invitations - resend invitation via owner',
    async ({ page }) => {
      const teamPage = new TeamPage(page);
      await teamPage.createTeam(team);
      await teamPage.isTeamSelected(team);
      await teamPage.openInvitationsPageViaOptionsMenu();
      await teamPage.clickInviteMembersToTeamButton();
      await teamPage.isInviteMembersPopUpHeaderDisplayed(
        'Invite members to the team',
      );
      await teamPage.enterEmailToInviteMembersPopUp('testeditor@test.com');
      await teamPage.clickSendInvitationButton();
      await teamPage.isSuccessMessageDisplayed('Invitation sent successfully');
      await teamPage.isInvitationRecordDisplayed(
        'testeditor@test.com',
        'Editor',
        'Pending',
      );
      await teamPage.resendInvitation();
      await teamPage.isSuccessMessageDisplayed('Invitation sent successfully');
    },
  );

  test.afterEach(async ({ page }) => {
    const teamPage = new TeamPage(page);
    await teamPage.deleteTeam(team);
  });
});

test.describe(() => {
  const team = random().concat('autotest');

  mainTest(
    'DA-92 Team Invitations - delete invitation via owner',
    async ({ page }) => {
      const teamPage = new TeamPage(page);
      await teamPage.createTeam(team);
      await teamPage.isTeamSelected(team);
      await teamPage.openInvitationsPageViaOptionsMenu();
      await teamPage.clickInviteMembersToTeamButton();
      await teamPage.isInviteMembersPopUpHeaderDisplayed(
        'Invite members to the team',
      );
      await teamPage.enterEmailToInviteMembersPopUp('testeditor@test.com');
      await teamPage.clickSendInvitationButton();
      await teamPage.isSuccessMessageDisplayed('Invitation sent successfully');
      await teamPage.isInvitationRecordDisplayed(
        'testeditor@test.com',
        'Editor',
        'Pending',
      );
      await teamPage.deleteInvitation();
      await teamPage.isInvitationRecordRemoved();
    },
  );

  test.afterEach(async ({ page }) => {
    const teamPage = new TeamPage(page);
    await teamPage.deleteTeam(team);
  });
});

test.describe(() => {
  const team = random().concat('autotest');

  mainTest(
    'DA-95 Team Invitations - change role in invitation via owner',
    async ({ page }) => {
      const teamPage = new TeamPage(page);
      await teamPage.createTeam(team);
      await teamPage.isTeamSelected(team);
      await teamPage.openInvitationsPageViaOptionsMenu();
      await teamPage.clickInviteMembersToTeamButton();
      await teamPage.isInviteMembersPopUpHeaderDisplayed(
        'Invite members to the team',
      );
      await teamPage.enterEmailToInviteMembersPopUp('testrole@test.com');
      await teamPage.clickSendInvitationButton();
      await teamPage.isSuccessMessageDisplayed('Invitation sent successfully');
      await teamPage.isInvitationRecordDisplayed(
        'testrole@test.com',
        'Editor',
        'Pending',
      );
      await teamPage.selectInvitationRoleInInvitationRecord('Admin');
      await teamPage.isInvitationRecordDisplayed(
        'testrole@test.com',
        'Admin',
        'Pending',
      );
    },
  );

  test.afterEach(async ({ page }) => {
    const teamPage = new TeamPage(page);
    await teamPage.deleteTeam(team);
  });
});

test.describe(() => {
  const team = random().concat('autotest');

  mainTest(
    'DA-114 Team Settings - upload team profile picture',
    async ({ page }) => {
      const teamPage = new TeamPage(page);
      await teamPage.createTeam(team);
      await teamPage.isTeamSelected(team);
      await teamPage.openTeamSettingsPageViaOptionsMenu();
      await teamPage.uploadTeamImage('images/images.png');
      await teamPage.waitInfoMessageHidden();
      await teamPage.hoverOnTeamName();
      await expect(teamPage.teamInfoSection).toHaveScreenshot(
        'team-profile-image.png',
        {
          mask: [teamPage.teamNameLabel],
        },
      );
    },
  );

  test.afterEach(async ({ page }) => {
    const teamPage = new TeamPage(page);
    await teamPage.deleteTeam(team);
  });
});

test.describe(() => {
  const team = random().concat('autotest');

  mainTest("DA-116 Team. Settings - check 'Team members' info", async ({ page }) => {
    const teamPage = new TeamPage(page);
    const profilePage = new ProfilePage(page);
    await profilePage.openYourAccountPage();
    await profilePage.isHeaderDisplayed('Your account');
    await profilePage.changeProfileName('QA Engineer');
    await profilePage.uploadProfileImage('images/sample.jpeg');
    await profilePage.waitInfoMessageHidden();
    await profilePage.backToDashboardFromAccount();
    await teamPage.createTeam(team);
    await teamPage.isTeamSelected(team);
    await teamPage.openTeamSettingsPageViaOptionsMenu();

    const teamOwner = 'QA Engineer (Owner)';
    await teamPage.isTeamOwnerInfoDisplayed(teamOwner);
    await teamPage.isTeamMembersInfoDisplayed('1 members');
    await expect(teamPage.teamOwnerSection).toHaveScreenshot('team-owner-block.png');
  });

  test.afterEach(async ({ page }) => {
    const teamPage = new TeamPage(page);
    await teamPage.deleteTeam(team);
  });
});

test.describe(() => {
  const team = random().concat('autotest');

  mainTest(
    "DA-117 Team. Settings - check 'Team projects' info",
    async ({ page }) => {
      const dashboardPage = new DashboardPage(page);
      const teamPage = new TeamPage(page);
      const mainPage = new MainPage(page);
      const projectFirst = 'QA Project 1';
      const projectSecond = 'QA Project 2';

      await teamPage.createTeam(team);
      await teamPage.isTeamSelected(team);
      await dashboardPage.createProject(projectFirst);
      await dashboardPage.createProject(projectSecond);
      await dashboardPage.openSidebarItem('Drafts');
      await dashboardPage.createFileViaPlaceholder();
      await mainPage.backToDashboardFromFileEditor();
      await dashboardPage.openProjectFromLeftSidebar(projectFirst);
      await dashboardPage.createFileViaPlaceholder();
      await mainPage.backToDashboardFromFileEditor();
      await dashboardPage.openProjectFromLeftSidebar(projectSecond);
      await dashboardPage.createFileViaPlaceholder();
      await mainPage.backToDashboardFromFileEditor();

      await teamPage.openTeamSettingsPageViaOptionsMenu();
      await teamPage.isTeamProjectsInfoDisplayed('2 projects');
      await teamPage.isTeamFilesInfoDisplayed('3 files');
      await expect(teamPage.teamStatsSection).toHaveScreenshot(
        'team-stats-block.png',
      );
    },
  );

  test.afterEach(async ({ page }) => {
    const teamPage = new TeamPage(page);
    await teamPage.deleteTeam(team);
  });
});

test.describe(() => {
  const team = random().concat('autotest');
  const teamNew = random().concat('autotest');

  mainTest('DA-119 Rename a team via owner', async ({ page }) => {
    const teamPage = new TeamPage(page);
    await teamPage.createTeam(team);
    await teamPage.isTeamSelected(team);
    await teamPage.renameTeam(teamNew);
    await teamPage.isTeamSelected(teamNew);
  });

  test.afterEach(async ({ page }) => {
    const teamPage = new TeamPage(page);
    await teamPage.deleteTeams([team, teamNew]);
  });
});

test.describe(() => {
  const team = random().concat('autotest');

  mainTest('DA-122 Delete a team via owner', async ({ page }) => {
    const teamPage = new TeamPage(page);
    await teamPage.createTeam(team);
    await teamPage.isTeamSelected(team);
    await teamPage.deleteTeam(team);
    await teamPage.isTeamDeleted(team);
  });

  test.afterEach(async ({ page }) => {
    const teamPage = new TeamPage(page);
    await teamPage.deleteTeam(team);
  });
});
