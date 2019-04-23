Then(/^I should see buttons on the bottom$/) do
    assert_text('1') 
    expect(page).to have_css('li.previous.disabled', count: 1) 
    expect(page).to have_css('li.next.disabled', count: 1)
    page.should have_css('.row4')

end

Then(/^I should see options one through five$/) do
    assert_text('1')
    page.should have_css('.row4')
    assert_text('2')
    page.should have_css('.row4')
    assert_text('3')
    page.should have_css('.row4')
    assert_text('4')
    page.should have_css('.row4')
    assert_text('5')
    page.should have_css('.row4')
    expect(page).to have_css('li.previous.disabled', count: 1) 
    expect(page).to have_css('li.next', count: 1) 
end

Then(/^if I click four, I should see option six$/) do
    find('li.next').click
    find('li.next').click
    find('li.next').click
    find('li.next').click
    assert_text(6)
    assert_text(2)
    expect(page).to have_css('li.previous', count: 1) 
end
Then(/^I go to the seventh page$/) do
    find('li.next').click
    find('li.next').click
    find('li.next').click
    find('li.next').click
    find('li.next').click
    find('li.next').click
    assert_text(7)
    expect(page).to have_css('li.previous', count: 1) 
end

Then(/^restaurant should be empty$/) do
    assert_text('No search results exist')
end
Then(/^only one recipe should exist$/) do
    page.should have_css('.row0')
end

Given("I look for many results") do 
    visit 'localhost:3000/Search'
    fill_in 'query', :with => 'burger'
    fill_in 'radius', :with => 3
    fill_in 'amount', :with => ""
    fill_in 'amount', :with => 30
    click_button("Feed Me!")
end
Given("I look for uneven results") do 
    visit 'localhost:3000/Search'
    fill_in 'query', :with => 'burger'
    fill_in 'radius', :with => 3
    fill_in 'amount', :with => ""
    fill_in 'amount', :with => 31
    click_button("Feed Me!")
end
Given("I look for small radius") do 
    visit 'localhost:3000/Search'
    fill_in 'query', :with => 'burger'
    fill_in 'radius', :with => 1
    fill_in 'amount', :with => ""
    fill_in 'amount', :with => 5
    click_button("Feed Me!")
end
Given("I look for subfive ") do 
    visit 'localhost:3000/Search'
    fill_in 'query', :with => 'burger'
    fill_in 'radius', :with => 3
    fill_in 'amount', :with => ""
    fill_in 'amount', :with => 4
    click_button("Feed Me!")
end