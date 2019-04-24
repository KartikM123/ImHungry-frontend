Given("I am on the Register page of the I'm Hungry website for Session Testing") do
  visit 'localhost:3000/Register'
end

Given("I am on a unique signin for Session Testing") do
  fill_in 'username', :with => "session1"
  fill_in 'password', :with => "session1"
  fill_in 'email', :with => "session1@usc.edu"
  click_button('register')
  sleep(2.to_i)
  visit 'localhost:3000/SignIn'
  fill_in 'username', :with => "session1"
  fill_in 'password', :with => "session1"
  click_button('login')
  expect(page).to have_current_path('/Search')
end

When("I search for {string} with {string} amount and {string} in miles for Session Testing") do |string, string2, string3|
  fill_in 'query', :with => string
  fill_in('amount', :with => '')
  fill_in('amount', :with => string2)
  fill_in "radius", with: string3
  find('#feedme').click
end

When("I navigate to recipe {string} page for Session Testing") do |string|
  find('font', text: string).click
end

When("I navigate to restaurant {string} page for Session Testing") do |string|
  find('font', text: string).click
end

When("I save ingredients {string} and {string} for Session Testing") do |string, string2|
  find('span', text: string).click
  find('span', text: string2).click
  find('#add').click
  sleep(4.to_i)
end

When("I logout of the account for Session Testing") do
  open_drawer
  find('#signout').click
end

When("I signin in as the unique signin for Session Testing") do
  fill_in 'username', :with => "session1"
  fill_in 'password', :with => "session1"
  click_button("login")
  expect(page).to have_current_path('/Search')
end

When("I navigate to Grocery page for Session Testing") do
  visit 'localhost:3000/Grocery'
  expect(page).to have_current_path('/Grocery')
end

Then("I should see {string} and {string} for Session Testing") do |string, string2|
  substring = string.match(/\d*\s*(.*)/)
  substring2 = string2.match(/\d*\s*(.*)/)
  assert_text(substring[1])
  assert_text(substring2[1])
  puts substring2[1]
end

When("I delete ingredient {string} for Session Testing") do |string|
  substring = string.match(/\d*\s*(.*)/)
  find('span', text: substring[1]).first(:xpath,"../..").find('button').click
end

Then("I should not see {string} and see {string} for Session Testing") do |string, string2|
  substring = string.match(/\d*\s*(.*)/)
  substring2 = string2.match(/\d*\s*(.*)/)
  expect(page).not_to have_content(substring[1])
  assert_text(substring2[1])
end

When("I check on {string} for Session Testing") do |string|
  substring = string.match(/\d*\s*(.*)/)
  brownie = page.find_all('li')
  brownie.each { |brown|
    if brown.find('div').find('span').text.match(/\d*\s*(.*)/)[1] === substring[1]
      brown.first("input[type='checkbox']", :visible => false).set(true)
    end
  }
end

Then("I should see {string} checked out for Session Testing") do |string|
  substring = string.match(/\d*\s*(.*)/)
  brownie = page.find_all('li')
  brownie.each { |brown|
    if brown.find('div').find('span').text.match(/\d*\s*(.*)/)[1] === substring[1]
      expect(brown.first("input[type='checkbox']", :visible => false)).to be_checked
    end
  }
end

When("I save recipe {string} to list {string} for Session Testing") do |string, string2|
  open_drawer
  find('#select-resdrop', visible: false).click
  find('li', text: string2).click
  # find('#menu-resdrop').first('li[data-value="'+ string2 + '"]').click
  find('#reslist').click
  sleep(1.to_i)
  visit 'localhost:3000/Result'
  expect(page).to have_current_path('/Result')
end

When("I save restaurant {string} to list {string} for Session Testing") do |string, string2|
  open_drawer
  find('#select-resdrop', visible: false).click
  find('li', text: string2).click
  # find('#menu-resdrop').first('li[data-value="'+ string2 + '"]').click
  find('#reslist').click
  sleep(1.to_i)
  visit 'localhost:3000/Result'
  expect(page).to have_current_path('/Result')
end

When("I navigate to list {string} page for Session Testing") do |string|
  visit 'localhost:3000/Favorite'
  expect(page).to have_current_path('/Favorite')
  open_drawer
  find('#newlists').find('#listdrop').find('#select-resdrop').click
  find('li', text: string).click
  find('#list').click
end

Then("I should see recipe {string} for Session Testing") do |string|
  assert_text(string)
end

Given("I change recipe {string} to list {string} for Session Testing") do |string, string2|
  brownie = page.all(:xpath, '//div[@id="restContent"]/*')
  brownie.each { |brown|
    if brown.find_all('font')[1].text === string
      brown.find('#listdrop').find('#select-resdrop').click
      find('li', text: string2).click
      find('#moverec').click
      visit 'localhost:3000/Favorite'
      expect(page).to have_current_path('/Favorite')
    end
  }
  # find('#menu-resdrop').first('li[data-value="'+ string2 + '"]').click
end

Given("I delete recipe {string} from list {string} for Session Testing") do |string, string2|
  brownie = page.all(:xpath, '//div[@id="restContent"]/*')
  brownie.each { |brown|
    if brown.find_all('font')[1].text === string
      brown.find('#removerec').click
    end
  }
end

Then("I should not see recipe {string} for Session Testing") do |string|
  page.should have_no_content(string)
end

When("I move recipe {string} above restaurant {string} for Session Testing") do |string, string2|
  page.find('div#restContent').find('font', text: string).find(:xpath, '..').find("#uprec").click
end

Then("I should see recipe {string} above restaurant {string} for Session Testing") do |string, string2|
  brownie = page.all(:xpath, '//div[@id="restContent"]/*')
  brownie[0].find_all('font')[1].text === string
end

Then("I should see saved search {string} for Session Testing") do |string|
  assert_text(string)
end
Then("I should see restaurant {string} for Session Testing") do |string|
  assert_text(string)
end

When("I change restaurant {string} to list {string} for Session Testing") do |string, string2|
  brownie = page.all(:xpath, '//div[@id="restContent"]/*')
  brownie.each { |brown|
    if brown.find_all('font')[1].text === string
      brown.find('#listdrop').find('#select-resdrop').click
      find('li', text: string2).click
      find('#moveres').click
      visit 'localhost:3000/Favorite'
      expect(page).to have_current_path('/Favorite')
    end
  }
end

When("I delete restaurant {string} from list {string} for Session Testing") do |string, string2|
  brownie = page.all(:xpath, '//div[@id="restContent"]/*')
  brownie.each { |brown|
    if brown.find_all('font')[1].text === string
      brown.find('#removeres').click
    end
  }
end

Then("I should not see restaurant {string} for Session Testing") do |string|
  expect(page).not_to have_content(string)
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
