import { test, expect } from '@playwright/test';

test('Bank Holidays API test', async ({ request }) => {
  const apiUrl = 'https://www.gov.uk/bank-holidays.json';

  // Make a GET request to the Bank Holidays API
  const response = await request.get(apiUrl);

  //Ensure that a 200 was returned before parsing the response body
  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  // Assert that the response contains the expected regions
  expect(responseBody).toHaveProperty('england-and-wales');
  expect(responseBody).toHaveProperty('scotland');
  expect(responseBody).toHaveProperty('northern-ireland');

  // Assert that the 'england-and-wales' section contains holidays
  const englandHolidays = responseBody['england-and-wales'];
  expect(englandHolidays).toHaveProperty('events');
  expect(englandHolidays.events.length).toBeGreaterThan(0);

  // Assert that the first event has the necessary properties
  const firstHoliday = englandHolidays.events[0];
  expect(firstHoliday).toHaveProperty('date');
  expect(firstHoliday).toHaveProperty('title');
  expect(firstHoliday).toHaveProperty('bunting');
  expect(firstHoliday).toHaveProperty('notes');

  // Assert the date format is correct (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  expect(firstHoliday.date).toMatch(dateRegex);
});
