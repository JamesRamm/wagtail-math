from django import template

from wagtail_polymath.widgets import MATHJAX_VERSION


register = template.Library()


@register.simple_tag
def mathjax(config="TeX-MML-AM_CHTML"):
    return f"https://cdnjs.cloudflare.com/ajax/libs/mathjax/{MATHJAX_VERSION}/MathJax.js?config={config}"