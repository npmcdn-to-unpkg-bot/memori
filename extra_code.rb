<%= render 'events/form' %>


<% @memorial.reload.events.each_with_index do |event, index| %>
  <tr>
    <th scope="row"><%= index + 1 %></th>
    <td><%= event.title %></td>
    <td><%= display_short_date(event.date) %></td>
    <td><%= image_tag event.picture.url(:thumb) if event.picture? %></td>
    <td><%= truncate(event.description, length: 50, separator: '') %></td>
    <td><%= link_to "Edit" %></td>
    <td><%= link_to "Delete", memorial_event_path(@memorial, event), method: :delete, data: { confirm: "Are you sure?" } %></td>
  </tr>
<% end %>
