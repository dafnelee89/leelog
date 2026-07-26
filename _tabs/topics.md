---
title: Topics
icon: fas fa-sitemap
order: 1
---

# Topics

{% include lnb-menu.html %}

{% for group in site.data.lnb_menu %}
  <h2 id="{{ group.slug }}">
    <a href="{{ group.url | relative_url }}">{{ group.title }}</a>
  </h2>

  {% if group.children %}
    <ul>
      {% for child in group.children %}
        <li id="{{ group.slug }}-{{ child.slug }}">
          <a href="{{ child.url | relative_url }}">{{ child.title }}</a>
          <span>category: [{{ child.category | join: ', ' }}]</span>
        </li>
      {% endfor %}
    </ul>
  {% endif %}
{% endfor %}
