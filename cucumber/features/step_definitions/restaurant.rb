Given(/^I am on the Restaurant Page of the I'm Hungry website$/) do
	visit 'localhost:3000/Restaurant'
end
      
Then(/^I should see the Printable Version button$/) do
	expect(page.has_button?('Printable Version'))
end
      
Then(/^I should see the Back to Results button$/) do
	expect(page.has_button?('Return to Results'))
end

Then(/^I should see the Add to List button$/) do
	expect(page.has_button?('Add to List'))
end

Then(/^I should see the website link$/) do
	assert_text('Website')
end

Then(/^I should see the Address title$/) do
	assert_text('Address')
end

Then(/^I should see the Phone Number title$/) do
	assert_text('Phone Number')
end

Given(/^I am on the Restaurant page for restaurant "([^"]*)" from search "([^"]*)" with count "([^"]*)"$/) do |arg1, arg2, arg3|
  visit 'localhost:3000/Search'
  fill_in 'query', :with => arg2
  fill_in 'radius', :with => 10000
  click_button("Feed Me!")
  find('font', :text => arg1).click
end


Then(/^I should see name "([^"]*)"$/) do |arg1|
	assert_text(arg1)
end

Then(/^I should see address$/) do
	expect(page).to have_css('a.address')
end


Then(/^I should see the link "([^"]*)" to google maps$/) do |arg1|
	expect(page.find('a.address')[:href]).to include(arg1)
end

Then(/^I should see the link "([^"]*)" to the website$/) do |arg1|
	expect(page.find('a.web')[:href]).to include(arg1)
end

Then(/^I should remain on the Restaurant Page$/) do 
	expect(page).to have_current_path('/Restaurant')
end

When(/^I select the Add to List button$/) do
	find('#reslist', text: 'Add to List', visible:false).click
end

Then(/^I select the Back to Results button$/) do
	begin
		open_drawer
	rescue StandardError
	end
	find('#resrp', text:'Return to Results', visible:false).click

end

Then(/^I should see the Results Page for "([^"]*)"$/) do |arg1|
	page.should have_content('Results for: '+arg1)
end

Then(/^I should see item "([^"]*)" in list "([^']*)"$/) do |arg1, arg2|
	#expect correct list page

	page.should have_content(arg2)
	page.should have_content(arg1)
end

Given(/^I select the Printable Version button$/) do
	click_on('Printable Version')
end

Then(/^the page should be a printable version$/) do
	page.should have_no_content('.rebuttons')
end
