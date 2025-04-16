Feature: Basic Acceptance Test
  As a tester
  I want to verify the test setup
  So that I can confirm everything is working correctly

  @ui
  Scenario: Verify test environment
    Given I am on the test page
    Then I should see the page title
