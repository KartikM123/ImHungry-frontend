# Given("I am on the Recipe page for recipe {string} from search {string} with count {string} logged in") do |string, string2, string3|
#   fill_in 'query', :with => string2
#   fill_in 'radius', :with => 3
#   find('#feedme').click
#   find('font', text: string, exact: true).click
# end

# When("I add the ingredient {string}") do |string|
#   find('span', text: string).click
#   find('#add').click
# end

# When("I navigate to the Grocery page") do
#   find('#rightDrawer').click
#   find('#resrp').click
#   find('#drawer').click
#   find('#grocery').click
# end

# Then("I should see the Grocery page with {string}") do |string|
# 	assert_text('Grocery List')
# 	assert_text(string)
# end

# When("I add the {string} from the Recipe page") do |string|
#     fill_in 'query', :with => 'burger'
#     fill_in 'radius', :with => 3
#     find('#feedme').click
#     find('font', text: 'Halloumi aubergine burgers with harissa relish', exact: true).click
#   	find('span', text: string).click
#   	find('#add').click
# end

# Given("I am on the Grocery page") do
#     fill_in 'query', :with => 'burger'
#     fill_in 'radius', :with => 3
#     find('#feedme').click
#     find('font', text: 'Halloumi aubergine burgers with harissa relish', exact: true).click
#     visit 'localhost:3000/Grocery'
# end

# When("I delete the {string}") do |string|
#   substring = string.match(/\d*\s*(.*)/)
#   find('span', text: substring[1]).first(:xpath,"../..").find('button').click
# end

# Then("I should not see the deleted {string}") do |string|
#   expect(page).not_to have_content(string)
# end

Given("I am on the Register page of the I'm Hungry website for Grocery Testing") do
  visit 'localhost:3000/Register'
end

Given("I am on a unique signin for Grocery Testing") do
  fill_in 'username', :with => "grocery1"
  fill_in 'password', :with => "grocery1"
  fill_in 'email', :with => "grocery1@usc.edu"
  click_button('register')
  sleep(2.to_i)
  visit 'localhost:3000/SignIn'
  fill_in 'username', :with => "grocery1"
  fill_in 'password', :with => "grocery1"
  click_button('login')
end

When("I search for {string} with {string} amount and {string} in miles for Grocery Testing") do |string, string2, string3|
  fill_in 'query', :with => string
  fill_in('amount', :with => '')
  fill_in('amount', :with => string2)
  fill_in "radius", with: string3
  find('#feedme').click
end

When("I navigate to Grocery page for Grocery Testing") do
  visit 'localhost:3000/Grocery'
  expect(page).to have_current_path('/Grocery')
end

When("I navigate to recipe {string} page for Grocery Testing") do |string|
  find('font', text: string).click
end

When("I save ingredients {string} and {string} for Grocery Testing") do |string, string2|
  find('span', text: string).click
  find('span', text: string2).click
  find('#add').click
  sleep(4.to_i)
end

Then("I should see {string} and {string} for Grocery Testing") do |string, string2|
  substring = string.match(/\d*\s*(.*)/)
  substring2 = string2.match(/\d*\s*(.*)/)
  assert_text(substring[1])
  assert_text(substring2[1])
  puts substring2[1]
end

Then("I should see double the {string} and {string} for Grocery Testing") do |string, string2|
  substring = string.match(/(\d*)\s*(.*)/)
  substring2 = string2.match(/(\d*)\s*(.*)/)
  # find((substring[1]*2).to_s + " " + substring[2])
  # find((substring2[1]*2).to_s + " " + substring2[2])
  temp1 = (substring[1].to_f * 2).to_s + " " + substring[2]
  find_all('li').find(temp1)
  temp2 = (substring2[1].to_f * 2).to_s + " " + substring2[2]
  find_all('li').find(temp2)

  # brownie = page.find_all('li')
  # brownie.each { |brown|
  #   substringrow = brown.find('div').find('span').text.match(/(\d*)\s*(.*)/)
  #   if (substring[1]*2 === substringrow[1] && )
  #   if brown.find('div').find('span').text.match(/\d*\s*(.*)/)[1] === substring[1]
      
  #   end
  # }
end

When("I delete ingredient {string} for Grocery Testing") do |string|
  substring = string.match(/\d*\s*(.*)/)
  find('span', text: substring[1]).first(:xpath,"../..").find('button').click
end

When("I logout of the account for Grocery Testing") do
  visit 'localhost:3000/SignIn'
end

When("I signin in as the unique signin for Grocery Testing") do
  visit 'localhost:3000/SignIn'
  fill_in 'username', :with => "grocery1"
  fill_in 'password', :with => "grocery1"
  click_button('login')
  expect(page).to have_current_path('/Search')
end

Then("I should not see {string} and see {string} for Grocery Testing") do |string, string2|
  substring = string.match(/\d*\s*(.*)/)
  substring2 = string2.match(/\d*\s*(.*)/)
  expect(page).not_to have_content(substring[1])
  assert_text(substring2[1])
end

When("I check on {string} for Grocery Testing") do |string|
  substring = string.match(/\d*\s*(.*)/)
  brownie = page.find_all('li')
  brownie.each { |brown|
    if brown.find('div').find('span').text.match(/\d*\s*(.*)/)[1] === substring[1]
      brown.first("input[type='checkbox']", :visible => false).set(true)
    end
  }
end

Then("I should see {string} checked out for Grocery Testing") do |string|
  substring = string.match(/\d*\s*(.*)/)
  brownie = page.find_all('li')
  brownie.each { |brown|
    if brown.find('div').find('span').text.match(/\d*\s*(.*)/)[1] === substring[1]
      expect(brown.first("input[type='checkbox']", :visible => false)).to be_checked
    end
  }
end
When("I return to Results Page for Grocery Testing") do
  open_drawer
  find('#resrp').click
end
def open_drawer
  begin
    find('#drawer').click
  rescue Capybara::ElementNotFound
    begin
      find('#rightDrawer').click
    rescue Capybara::ElementNotFound
      begin
        find('#rightDrawer2').click
      end
    end
  end
end
