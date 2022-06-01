## News

{% for item in news %}
<div class="news-item">
    <div class="news-date">{{ item.date | prettyDate }}</div>
    <div class="news-text">{{ item.text }}</div>
</div>
{% endfor %}