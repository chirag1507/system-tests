Feature: Property Search
  As a potential home buyer
  I want to search for properties
  So that I can find my dream home

  Scenario: Basic property search in a suburb
    Given I am on the property search page
    When I search for properties in "Richmond"
    Then I should see a list of properties in "Richmond"
    And the search results should be relevant to my search
