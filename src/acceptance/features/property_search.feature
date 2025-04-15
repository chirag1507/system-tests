Feature: Property Search
  As a potential home buyer
  I want to search for properties
  So that I can find my dream home

  Scenario: Basic property search in a suburb
    Given I am on the property search page
    When I search for properties in "Richmond"
    Then I should see a list of properties in "Richmond"
    And the search results should be relevant to my search

  Scenario: Property search with filters
    Given I am on the property search page
    When I search for properties in "Richmond" with the following filters:
      | Filter Type   | Value |
      | Bathrooms     |    2+ |
      | Bedrooms      |    3+ |
      | Property Type | House |
    Then I should see a list of properties matching all my criteria
    And the search results should be relevant to my search
    And each property should have at least:
      | Attribute | Value |
      | Bathrooms |     2 |
      | Bedrooms  |     3 |
      | Type      | House |
