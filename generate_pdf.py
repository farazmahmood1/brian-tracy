#!/usr/bin/env python3
"""Generate a premium, full-color Forrof company PDF matching the website dark theme."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor, white, Color
from reportlab.lib.units import inch, mm
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether
)
from reportlab.platypus.flowables import Flowable
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.graphics.shapes import Drawing, Rect, Circle, Line, String
from reportlab.graphics import renderPDF
import os, math

# ─── Brand Colors (from your website dark theme) ────────────────────────────
BG_DARK = HexColor("#050a12")        # deep blue-black background
BG_CARD = HexColor("#0b1120")        # card background
BG_CARD2 = HexColor("#0d1526")       # slightly lighter card
BG_SURFACE = HexColor("#111a2e")     # surface/section bg
ACCENT = HexColor("#00d4aa")         # bright cyan-teal accent
ACCENT2 = HexColor("#48f0e7")        # lighter cyan (marquee)
TEAL_DARK = HexColor("#126b66")      # secondary teal
TEXT_PRIMARY = HexColor("#f0ece6")    # warm white text
TEXT_MUTED = HexColor("#7a8a99")      # muted gray-blue
TEXT_DIM = HexColor("#4a5568")        # dimmer text
BORDER = HexColor("#1a3a35")         # teal-ish border
WHITE = white
TRANSPARENT = Color(0, 0, 0, 0)

W, H = A4


# ─── Custom Flowables ───────────────────────────────────────────────────────

class ColoredBackground(Flowable):
    """Full-width colored rectangle behind content."""
    def __init__(self, width, height, color=BG_DARK):
        Flowable.__init__(self)
        self.width = width
        self.height = height
        self.color = color

    def draw(self):
        self.canv.setFillColor(self.color)
        self.canv.rect(-50, -self.height, self.width + 100, self.height + 20, fill=True, stroke=False)


class GlowCircle(Flowable):
    """Decorative glow effect."""
    def __init__(self, x, y, radius, color, alpha=0.15):
        Flowable.__init__(self)
        self.x = x
        self.y = y
        self.radius = radius
        self.glow_color = color
        self.alpha = alpha
        self.width = 0
        self.height = 0

    def draw(self):
        c = self.canv
        for i in range(5):
            factor = 1 - (i * 0.18)
            a = self.alpha * factor
            r = self.radius * (1 + i * 0.3)
            col = Color(
                self.glow_color.red, self.glow_color.green, self.glow_color.blue, a
            )
            c.setFillColor(col)
            c.circle(self.x, self.y, r, fill=True, stroke=False)


class AccentLine(Flowable):
    """Horizontal accent line."""
    def __init__(self, width=80, thickness=3, color=ACCENT):
        Flowable.__init__(self)
        self.line_width = width
        self.thickness = thickness
        self.color = color
        self.width = width
        self.height = thickness + 4

    def draw(self):
        self.canv.setStrokeColor(self.color)
        self.canv.setLineWidth(self.thickness)
        self.canv.line(0, 0, self.line_width, 0)


class RoundedCard(Flowable):
    """Rounded rectangle card with content."""
    def __init__(self, width, height, bg_color=BG_CARD, border_color=BORDER,
                 radius=8, border_width=0.5):
        Flowable.__init__(self)
        self.card_width = width
        self.card_height = height
        self.bg_color = bg_color
        self.border_color = border_color
        self.radius = radius
        self.border_width = border_width
        self.width = width
        self.height = height

    def draw(self):
        c = self.canv
        c.setFillColor(self.bg_color)
        c.setStrokeColor(self.border_color)
        c.setLineWidth(self.border_width)
        c.roundRect(0, 0, self.card_width, self.card_height,
                    self.radius, fill=True, stroke=True)


class DotGrid(Flowable):
    """Decorative dot grid pattern."""
    def __init__(self, cols=8, rows=4, spacing=18, dot_r=1.2, color=TEXT_DIM):
        Flowable.__init__(self)
        self.cols = cols
        self.rows = rows
        self.spacing = spacing
        self.dot_r = dot_r
        self.color = color
        self.width = cols * spacing
        self.height = rows * spacing

    def draw(self):
        c = self.canv
        c.setFillColor(Color(self.color.red, self.color.green, self.color.blue, 0.3))
        for row in range(self.rows):
            for col in range(self.cols):
                x = col * self.spacing
                y = row * self.spacing
                c.circle(x, y, self.dot_r, fill=True, stroke=False)


# ─── Page background callback ───────────────────────────────────────────────

def draw_page_bg(canvas, doc):
    """Draw dark background + subtle gradient glows on every page."""
    canvas.saveState()
    # Full page dark bg
    canvas.setFillColor(BG_DARK)
    canvas.rect(0, 0, W, H, fill=True, stroke=False)

    # Subtle top-left teal glow
    for i in range(8):
        a = 0.03 * (1 - i * 0.12)
        r = 150 + i * 40
        canvas.setFillColor(Color(0.07, 0.42, 0.40, max(a, 0)))
        canvas.circle(40, H - 40, r, fill=True, stroke=False)

    # Subtle bottom-right cyan glow
    for i in range(6):
        a = 0.02 * (1 - i * 0.15)
        r = 120 + i * 35
        canvas.setFillColor(Color(0, 0.83, 0.67, max(a, 0)))
        canvas.circle(W - 60, 60, r, fill=True, stroke=False)

    # Page border accent line at top
    canvas.setStrokeColor(Color(0, 0.83, 0.67, 0.3))
    canvas.setLineWidth(1.5)
    canvas.line(50, H - 25, W - 50, H - 25)

    # Footer
    canvas.setFillColor(TEXT_DIM)
    canvas.setFont("Helvetica", 7)
    canvas.drawCentredString(W / 2, 20, "FORROF  |  forrof.io  |  hello@forrof.io  |  Confidential")

    canvas.restoreState()


# ─── Styles ──────────────────────────────────────────────────────────────────

def S(name, **kw):
    defaults = dict(fontName='Helvetica', textColor=TEXT_PRIMARY, alignment=TA_LEFT)
    defaults.update(kw)
    return ParagraphStyle(name, **defaults)

st = {
    'hero_title': S('hero_title', fontSize=42, leading=48, fontName='Helvetica-Bold',
                     textColor=TEXT_PRIMARY, alignment=TA_CENTER, spaceAfter=8),
    'hero_accent': S('hero_accent', fontSize=42, leading=48, fontName='Helvetica-Bold',
                      textColor=ACCENT, alignment=TA_CENTER, spaceAfter=8),
    'hero_sub': S('hero_sub', fontSize=13, leading=20, textColor=TEXT_MUTED,
                   alignment=TA_CENTER, spaceAfter=6),
    'section_tag': S('section_tag', fontSize=9, leading=12, fontName='Helvetica-Bold',
                      textColor=ACCENT, spaceBefore=0, spaceAfter=6,
                      tracking=2),
    'section_title': S('section_title', fontSize=24, leading=30, fontName='Helvetica-Bold',
                        textColor=TEXT_PRIMARY, spaceAfter=10),
    'section_title_c': S('section_title_c', fontSize=24, leading=30, fontName='Helvetica-Bold',
                          textColor=TEXT_PRIMARY, spaceAfter=10, alignment=TA_CENTER),
    'body': S('body', fontSize=10, leading=16, textColor=TEXT_MUTED, spaceAfter=8),
    'body_c': S('body_c', fontSize=10, leading=16, textColor=TEXT_MUTED,
                 spaceAfter=8, alignment=TA_CENTER),
    'small': S('small', fontSize=8.5, leading=13, textColor=TEXT_DIM, spaceAfter=4),
    'small_c': S('small_c', fontSize=8.5, leading=13, textColor=TEXT_DIM,
                  spaceAfter=4, alignment=TA_CENTER),
    'stat_num': S('stat_num', fontSize=36, leading=40, fontName='Helvetica-Bold',
                   textColor=ACCENT, alignment=TA_CENTER),
    'stat_label': S('stat_label', fontSize=8.5, leading=12, textColor=TEXT_MUTED,
                     alignment=TA_CENTER),
    'card_title': S('card_title', fontSize=13, leading=17, fontName='Helvetica-Bold',
                     textColor=TEXT_PRIMARY, spaceAfter=4),
    'card_body': S('card_body', fontSize=9, leading=14, textColor=TEXT_MUTED, spaceAfter=3),
    'card_num': S('card_num', fontSize=11, leading=14, fontName='Helvetica-Bold',
                   textColor=ACCENT, spaceAfter=2),
    'price_amount': S('price_amount', fontSize=30, leading=36, fontName='Helvetica-Bold',
                       textColor=ACCENT, alignment=TA_CENTER, spaceAfter=4),
    'price_name': S('price_name', fontSize=15, leading=20, fontName='Helvetica-Bold',
                     textColor=TEXT_PRIMARY, alignment=TA_CENTER, spaceAfter=4),
    'price_desc': S('price_desc', fontSize=9, leading=14, textColor=TEXT_MUTED,
                     alignment=TA_CENTER, spaceAfter=8),
    'quote': S('quote', fontSize=10, leading=16, fontName='Helvetica-Oblique',
               textColor=TEXT_MUTED, spaceAfter=4, leftIndent=10, rightIndent=10),
    'quote_author': S('quote_author', fontSize=9, leading=13, fontName='Helvetica-Bold',
                       textColor=TEXT_PRIMARY, spaceAfter=2, leftIndent=10),
    'quote_role': S('quote_role', fontSize=8, leading=12, textColor=ACCENT,
                     spaceAfter=14, leftIndent=10),
    'bullet': S('bullet', fontSize=9.5, leading=15, textColor=TEXT_MUTED, spaceAfter=3,
                 leftIndent=16, bulletIndent=6),
    'check': S('check', fontSize=9.5, leading=15, textColor=TEXT_MUTED, spaceAfter=3),
    'faq_q': S('faq_q', fontSize=11, leading=16, fontName='Helvetica-Bold',
               textColor=TEXT_PRIMARY, spaceBefore=12, spaceAfter=4),
    'faq_a': S('faq_a', fontSize=9.5, leading=15, textColor=TEXT_MUTED, spaceAfter=6),
    'contact_label': S('contact_label', fontSize=9, leading=14, fontName='Helvetica-Bold',
                        textColor=TEXT_DIM),
    'contact_value': S('contact_value', fontSize=11, leading=16, fontName='Helvetica',
                        textColor=TEXT_PRIMARY),
    'closing_title': S('closing_title', fontSize=30, leading=38, fontName='Helvetica-Bold',
                        textColor=TEXT_PRIMARY, alignment=TA_CENTER, spaceAfter=8),
    'tech_cat': S('tech_cat', fontSize=10, leading=15, fontName='Helvetica-Bold',
                   textColor=ACCENT, spaceAfter=2),
    'tech_items': S('tech_items', fontSize=9.5, leading=14, textColor=TEXT_MUTED, spaceAfter=8),
}


# ─── Build PDF ───────────────────────────────────────────────────────────────

output_path = os.path.join(os.path.expanduser("~"), "Desktop", "Forrof_Company_Profile.pdf")

doc = SimpleDocTemplate(
    output_path, pagesize=A4,
    topMargin=45, bottomMargin=45, leftMargin=50, rightMargin=50,
)

story = []
content_w = W - 100  # usable width

def accent_line(width=80):
    return AccentLine(width=width, thickness=2.5, color=ACCENT)

def section_header(tag, title, centered=False):
    story.append(Paragraph(tag.upper(), st['section_tag']))
    story.append(Paragraph(title, st['section_title_c'] if centered else st['section_title']))
    story.append(accent_line(60))
    story.append(Spacer(1, 12))

def card_table(data, col_widths, card_bg=BG_CARD, border=BORDER, pad=12):
    t = Table(data, colWidths=col_widths)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), card_bg),
        ('BOX', (0, 0), (-1, -1), 0.5, border),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, border),
        ('TOPPADDING', (0, 0), (-1, -1), pad),
        ('BOTTOMPADDING', (0, 0), (-1, -1), pad),
        ('LEFTPADDING', (0, 0), (-1, -1), pad),
        ('RIGHTPADDING', (0, 0), (-1, -1), pad),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('ROUNDEDCORNERS', [6, 6, 6, 6]),
    ]))
    return t


# ══════════════════════════════════════════════════════════════════════════════
# PAGE 1: COVER
# ══════════════════════════════════════════════════════════════════════════════
story.append(Spacer(1, 80))
story.append(DotGrid(cols=12, rows=3, spacing=16, dot_r=1, color=ACCENT))
story.append(Spacer(1, 30))

# FORROF title with accent
story.append(Paragraph("FORROF", S('cover_brand', fontSize=56, leading=62,
    fontName='Helvetica-Bold', textColor=ACCENT, alignment=TA_CENTER, spaceAfter=6)))
story.append(Spacer(1, 6))
story.append(Paragraph("Building Intelligent Software", st['hero_title']))
story.append(Paragraph("for the AI Era", st['hero_accent']))
story.append(Spacer(1, 14))

# Center accent line
cover_line = AccentLine(width=100, thickness=3, color=ACCENT)
cover_line_table = Table([[cover_line]], colWidths=[content_w])
cover_line_table.setStyle(TableStyle([('ALIGN', (0,0), (0,0), 'CENTER')]))
story.append(cover_line_table)
story.append(Spacer(1, 18))

story.append(Paragraph(
    "We design and build custom software, AI systems, and digital platforms "
    "for companies worldwide — helping businesses scale with modern, "
    "future-ready technology.",
    st['hero_sub']
))
story.append(Spacer(1, 50))

# Cover stats row
cover_stats = [
    [Paragraph("150+", st['stat_num']), Paragraph("50+", st['stat_num']),
     Paragraph("98%", st['stat_num']), Paragraph("5+", st['stat_num'])],
    [Paragraph("Projects", st['stat_label']), Paragraph("Clients", st['stat_label']),
     Paragraph("Success Rate", st['stat_label']), Paragraph("Years", st['stat_label'])],
]
cw = content_w / 4
cs_table = Table(cover_stats, colWidths=[cw]*4)
cs_table.setStyle(TableStyle([
    ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('BACKGROUND', (0,0), (-1,-1), BG_CARD),
    ('BOX', (0,0), (-1,-1), 0.5, BORDER),
    ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER),
    ('TOPPADDING', (0,0), (-1,0), 16),
    ('BOTTOMPADDING', (0,-1), (-1,-1), 16),
    ('ROUNDEDCORNERS', [8, 8, 8, 8]),
]))
story.append(cs_table)
story.append(Spacer(1, 40))

story.append(Paragraph("hello@forrof.io  |  forrof.io  |  New York, NY", st['small_c']))
story.append(Paragraph("Company Profile  |  2026", S('cover_year', fontSize=8,
    textColor=TEXT_DIM, alignment=TA_CENTER)))
story.append(PageBreak())


# ══════════════════════════════════════════════════════════════════════════════
# PAGE 2: ABOUT
# ══════════════════════════════════════════════════════════════════════════════
section_header("ABOUT US", "Who We Are")

story.append(Paragraph(
    "We build intelligent products and business systems that turn software into a "
    "growth engine. Forrof is a full-service software agency delivering branding, "
    "web development, mobile apps, UI/UX, SEO, cloud solutions, SaaS, cybersecurity, "
    "automation, and digital transformation for growing businesses.",
    st['body']
))
story.append(Paragraph(
    "We engineer intelligent software products and business systems that turn technology "
    "into a long-term growth engine. Our team partners with founders and growing teams "
    "to build AI-powered products, intelligent systems, and scalable software platforms.",
    st['body']
))
story.append(Spacer(1, 16))

# Capabilities marquee-style list
caps = [
    "AI Products", "SaaS Platforms", "Business Systems", "Automation",
    "Internal Tools", "AI Integrations", "Product Engineering", "Platform Architecture",
    "System Design", "Technical Strategy", "Scalable Software", "Data Platforms",
    "Workflow Automation", "Enterprise Software", "MVP Development", "Mobile Apps",
    "LLM Agents", "RAG Systems", "CTO-as-a-Service"
]
cap_text = "  <font color='#00d4aa'>\u2022</font>  ".join(
    [f"<font color='#7a8a99'>{c}</font>" for c in caps]
)
story.append(Paragraph(cap_text, S('caps', fontSize=8.5, leading=16, textColor=TEXT_MUTED,
    alignment=TA_CENTER, spaceAfter=16)))

story.append(Spacer(1, 12))

# Project breakdown cards
story.append(Paragraph("PROJECTS BY CATEGORY", st['section_tag']))
story.append(Spacer(1, 8))

breakdown_data = [
    [Paragraph("<b>AI/ML</b><br/><font color='#00d4aa' size='18'><b>52</b></font><br/><font color='#4a5568' size='7'>projects</font>", st['card_body']),
     Paragraph("<b>Enterprise</b><br/><font color='#00d4aa' size='18'><b>38</b></font><br/><font color='#4a5568' size='7'>projects</font>", st['card_body']),
     Paragraph("<b>SaaS</b><br/><font color='#00d4aa' size='18'><b>25</b></font><br/><font color='#4a5568' size='7'>projects</font>", st['card_body']),
     Paragraph("<b>MVP &amp; Strategy</b><br/><font color='#00d4aa' size='18'><b>37</b></font><br/><font color='#4a5568' size='7'>projects</font>", st['card_body'])],
]
bd_cw = content_w / 4 - 3
bd_table = card_table(breakdown_data, [bd_cw]*4, card_bg=BG_CARD, pad=14)
story.append(bd_table)

story.append(Spacer(1, 16))

# Growth chart data
story.append(Paragraph("YEAR-OVER-YEAR GROWTH", st['section_tag']))
story.append(Spacer(1, 6))
years = [("2020", "15"), ("2021", "25"), ("2022", "35"), ("2023", "28"),
         ("2024", "42"), ("2025", "48"), ("2026", "12*")]
year_row = [Paragraph(f"<font color='#7a8a99' size='7'>{y}</font><br/><font color='#00d4aa' size='12'><b>{n}</b></font>", st['card_body']) for y, n in years]
year_table = Table([year_row], colWidths=[content_w/7]*7)
year_table.setStyle(TableStyle([
    ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('BACKGROUND', (0,0), (-1,-1), BG_CARD),
    ('BOX', (0,0), (-1,-1), 0.5, BORDER),
    ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER),
    ('TOPPADDING', (0,0), (-1,-1), 12),
    ('BOTTOMPADDING', (0,0), (-1,-1), 12),
    ('ROUNDEDCORNERS', [6, 6, 6, 6]),
]))
story.append(year_table)
story.append(Paragraph("* Year to date", S('footnote', fontSize=7, textColor=TEXT_DIM, spaceAfter=0)))
story.append(PageBreak())


# ══════════════════════════════════════════════════════════════════════════════
# PAGE 3: SERVICES
# ══════════════════════════════════════════════════════════════════════════════
section_header("SERVICES", "Tech Solutions for Companies")
story.append(Paragraph(
    "We partner with founders and growing teams to build AI-powered products, "
    "intelligent systems, and scalable software platforms.",
    st['body']
))
story.append(Spacer(1, 10))

services = [
    ("01", "AI/ML Development",
     "Real-world AI systems — from document intelligence to custom agents and workflows — integrated directly into your business."),
    ("02", "Enterprise Software",
     "Intelligent internal platforms, dashboards, and automation systems that streamline operations and unlock growth at scale."),
    ("03", "SaaS Development",
     "Revenue-ready AI products and SaaS platforms engineered for speed, security, and effortless scalability from day one."),
    ("04", "MVP & POC Development",
     "From idea to production-grade platform — lean MVPs and prototypes that prove your concept and attract investors fast."),
    ("05", "Product Architecture & Strategy",
     "System design, AI strategy, and engineering direction that reduces risk and enables smarter decisions at every stage."),
]

for num, name, desc in services:
    svc_data = [[
        Paragraph(f"<font color='#00d4aa' size='20'><b>{num}</b></font>", st['card_num']),
        Paragraph(f"<b>{name}</b><br/><font color='#7a8a99' size='9'>{desc}</font>", st['card_title']),
    ]]
    svc_table = Table(svc_data, colWidths=[50, content_w - 60])
    svc_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), BG_CARD),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 12),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('LEFTPADDING', (0,0), (0,0), 14),
        ('LEFTPADDING', (1,0), (1,0), 10),
        ('RIGHTPADDING', (1,0), (1,0), 14),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('ROUNDEDCORNERS', [6, 6, 6, 6]),
    ]))
    story.append(svc_table)
    story.append(Spacer(1, 6))

story.append(Spacer(1, 10))
story.append(Paragraph("ADDITIONAL SERVICES", st['section_tag']))
story.append(Spacer(1, 4))
additional = ["Mobile App Development", "Branding & UI/UX", "Social Media Marketing",
              "Cloud Infrastructure", "DevOps & CI/CD", "API Development",
              "LLM Agents & RAG Systems", "CTO-as-a-Service"]
add_text = "  |  ".join([f"<font color='#7a8a99'>{s}</font>" for s in additional])
story.append(Paragraph(add_text, S('addl', fontSize=8.5, leading=14, textColor=TEXT_MUTED, alignment=TA_CENTER)))
story.append(PageBreak())


# ══════════════════════════════════════════════════════════════════════════════
# PAGE 4: FEATURED PROJECTS
# ══════════════════════════════════════════════════════════════════════════════
section_header("PORTFOLIO", "Featured Projects")

projects = [
    ("Bushel", "Farm Management Platform", "Web Development  |  Global",
     "Agricultural software with analytics", "95% user onboarding completion rate"),
    ("Olio", "Community Food Sharing App", "Mobile App  |  UK",
     "Sustainability & community engagement", "4.8-star rating, thousands of tonnes diverted"),
    ("Glamping", "Luxury Travel Booking", "Web Development  |  Europe",
     "Real-time booking & conversion optimization", "92% retention rate, 500+ properties"),
    ("Curogram", "Healthcare Communication", "Web Development  |  USA",
     "HIPAA-compliant telemedicine", "50,000+ patients, 35% reduced wait times"),
    ("Carbonmade", "Creative Portfolio Platform", "Web Development  |  USA",
     "Portfolio SaaS for creative professionals", "100,000+ creators, 45% more inquiries"),
    ("Loopiq", "Customer Engagement SaaS", "SaaS  |  UK",
     "Real-time analytics & automated workflows", "5,000+ businesses, 38% engagement boost"),
    ("RallyTyper", "Mobile Typing Game", "Mobile App  |  Global",
     "Gamified typing practice", "Thousands of players, strong retention"),
    ("FynoSign", "E-Signature Platform", "SaaS  |  Remote",
     "Secure document workflows", "60% faster document turnaround"),
]

# 2-column project cards
for i in range(0, len(projects), 2):
    row = []
    for j in range(2):
        if i + j < len(projects):
            p = projects[i + j]
            cell = Paragraph(
                f"<font color='#00d4aa' size='12'><b>{p[0]}</b></font><br/>"
                f"<font color='#f0ece6' size='9'>{p[1]}</font><br/>"
                f"<font color='#4a5568' size='7'>{p[2]}</font><br/><br/>"
                f"<font color='#7a8a99' size='8'>{p[3]}</font><br/>"
                f"<font color='#48f0e7' size='8'>\u2713 {p[4]}</font>",
                st['card_body']
            )
            row.append(cell)
        else:
            row.append("")
    proj_cw = content_w / 2 - 4
    pt = Table([row], colWidths=[proj_cw, proj_cw])
    pt.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), BG_CARD),
        ('BOX', (0,0), (0,0), 0.5, BORDER),
        ('BOX', (1,0), (1,0), 0.5, BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 14),
        ('BOTTOMPADDING', (0,0), (-1,-1), 14),
        ('LEFTPADDING', (0,0), (-1,-1), 14),
        ('RIGHTPADDING', (0,0), (-1,-1), 14),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('ROUNDEDCORNERS', [6, 6, 6, 6]),
    ]))
    story.append(pt)
    story.append(Spacer(1, 6))

story.append(PageBreak())


# ══════════════════════════════════════════════════════════════════════════════
# PAGE 5: PRICING
# ══════════════════════════════════════════════════════════════════════════════
section_header("PRICING", "Transparent, Value-Driven Pricing")
story.append(Paragraph(
    "Designed to scale with your business — from first MVP to enterprise platform.",
    st['body_c']
))
story.append(Spacer(1, 20))

tier1_items = [
    "\u2713  AI product or SaaS development",
    "\u2713  Platform & system architecture",
    "\u2713  Full-stack engineering",
    "\u2713  AI integrations",
    "\u2713  Scalable foundations",
    "\u2713  Source code & documentation",
]
tier2_items = [
    "\u2713  Everything in Product Build",
    "\u2713  Dedicated product engineers",
    "\u2713  Ongoing feature development",
    "\u2713  AI system evolution",
    "\u2713  Architecture & scaling support",
    "\u2713  Priority communication",
    "\u2713  Monthly strategy calls",
]

t1_body = "<br/>".join([f"<font color='#7a8a99'>{i}</font>" for i in tier1_items])
t2_body = "<br/>".join([f"<font color='#7a8a99'>{i}</font>" for i in tier2_items])

pricing_data = [
    [Paragraph("<font color='#7a8a99' size='8'>STARTER</font>", st['price_desc']),
     Paragraph("<font color='#00d4aa' size='8'>\u2605 POPULAR</font>", st['price_desc'])],
    [Paragraph("Product Build", st['price_name']),
     Paragraph("Product Partnership", st['price_name'])],
    [Paragraph("$5,490", st['price_amount']),
     Paragraph("$8,990<font size='12'>/mo</font>", st['price_amount'])],
    [Paragraph("<font color='#4a5568' size='8.5'>Ideal for MVPs, platforms,<br/>and system builds</font>", st['price_desc']),
     Paragraph("<font color='#4a5568' size='8.5'>Long-term product &amp;<br/>systems collaboration</font>", st['price_desc'])],
    [Paragraph(t1_body, st['card_body']),
     Paragraph(t2_body, st['card_body'])],
]

pcw = content_w / 2 - 4
price_table = Table(pricing_data, colWidths=[pcw, pcw])
price_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (0,-1), BG_CARD),
    ('BACKGROUND', (1,0), (1,-1), BG_CARD2),
    ('BOX', (0,0), (0,-1), 0.5, BORDER),
    ('BOX', (1,0), (1,-1), 1, ACCENT),
    ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('TOPPADDING', (0,0), (-1,-1), 10),
    ('BOTTOMPADDING', (0,0), (-1,-1), 10),
    ('LEFTPADDING', (0,0), (-1,-1), 16),
    ('RIGHTPADDING', (0,0), (-1,-1), 16),
    ('ROUNDEDCORNERS', [6, 6, 6, 6]),
]))
story.append(price_table)
story.append(PageBreak())


# ══════════════════════════════════════════════════════════════════════════════
# PAGE 6: TESTIMONIALS
# ══════════════════════════════════════════════════════════════════════════════
section_header("TESTIMONIALS", "What Our Clients Say")

testimonials = [
    ("Forrof transformed our brand completely. Their creative vision and attention to detail "
     "exceeded all our expectations. The team is incredibly professional and delivered results "
     "that truly represent who we are as a company.",
     "Sarah Mitchell", "CEO", "Bushel"),
    ("Working with Forrof was a game-changer for our business. They understood our vision perfectly "
     "and delivered results that have significantly increased our market presence and customer "
     "engagement across all channels.",
     "Michael Chen", "Founder", "Curogram"),
    ("The team at Forrof brings creativity and strategy together beautifully. Our platform has "
     "never looked better, and our engagement metrics have increased by over 200% since the "
     "redesign. Highly recommended!",
     "Emma Rodriguez", "Marketing Director", "Carbonmade"),
]

for quote, author, role, company in testimonials:
    q_data = [[
        Paragraph(
            f"<font color='#00d4aa' size='24'>\u201c</font><br/>"
            f"<font color='#7a8a99' size='9.5'><i>{quote}</i></font><br/><br/>"
            f"<font color='#f0ece6' size='10'><b>{author}</b></font><br/>"
            f"<font color='#00d4aa' size='8'>{role}, {company}</font>",
            st['card_body']
        ),
    ]]
    qt = Table(q_data, colWidths=[content_w])
    qt.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), BG_CARD),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER),
        ('LINEBEFORE', (0,0), (0,-1), 3, ACCENT),
        ('TOPPADDING', (0,0), (-1,-1), 16),
        ('BOTTOMPADDING', (0,0), (-1,-1), 16),
        ('LEFTPADDING', (0,0), (-1,-1), 20),
        ('RIGHTPADDING', (0,0), (-1,-1), 16),
        ('ROUNDEDCORNERS', [6, 6, 6, 6]),
    ]))
    story.append(qt)
    story.append(Spacer(1, 8))

story.append(Spacer(1, 16))

# Business scale section
story.append(Paragraph("SOLUTIONS BY BUSINESS SIZE", st['section_tag']))
story.append(Spacer(1, 8))

segments = [
    ("\u25cf  Enterprises", "Future-proof architecture, reliability, and long-term partnership"),
    ("\u25cf  Mid-Sized", "Fast time-to-market, scalability, visible business value every release"),
    ("\u25cf  Small Business", "Turnkey solutions, clear communication, no technical noise"),
    ("\u25cf  Startups", "Product-first thinking, UX and core value, not unnecessary features"),
]
for label, desc in segments:
    story.append(Paragraph(
        f"<font color='#f0ece6'><b>{label}</b></font>  "
        f"<font color='#7a8a99'>— {desc}</font>",
        st['body']
    ))

story.append(PageBreak())


# ══════════════════════════════════════════════════════════════════════════════
# PAGE 7: TEAM & TECH
# ══════════════════════════════════════════════════════════════════════════════
section_header("TEAM", "Our Team")
story.append(Paragraph(
    "48 team members across engineering, design, strategy, and operations — "
    "averaging 30 contributors per project.",
    st['body']
))
story.append(Spacer(1, 10))

team = [
    ("Alex Thompson", "Creative Director"),
    ("Maria Santos", "Lead Designer"),
    ("David Miller", "Brand Strategist"),
    ("Emma Wilson", "Marketing Lead"),
]
team_data = [[
    Paragraph(
        f"<font color='#f0ece6' size='11'><b>{n}</b></font><br/>"
        f"<font color='#00d4aa' size='8'>{r}</font>",
        st['card_body']
    ) for n, r in team
]]
tw = content_w / 4 - 3
team_table = Table(team_data, colWidths=[tw]*4)
team_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), BG_CARD),
    ('BOX', (0,0), (-1,-1), 0.5, BORDER),
    ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER),
    ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ('TOPPADDING', (0,0), (-1,-1), 18),
    ('BOTTOMPADDING', (0,0), (-1,-1), 18),
    ('ROUNDEDCORNERS', [6, 6, 6, 6]),
]))
story.append(team_table)
story.append(Spacer(1, 24))

# Tech stack
section_header("TECHNOLOGY", "Our Stack")

tech = [
    ("Frontend", "React  \u2022  React Native  \u2022  Next.js  \u2022  TypeScript  \u2022  Three.js  \u2022  Framer Motion"),
    ("Backend", "Node.js  \u2022  Express  \u2022  GraphQL  \u2022  Python"),
    ("Databases", "PostgreSQL  \u2022  Firebase  \u2022  MongoDB"),
    ("Cloud & DevOps", "AWS  \u2022  CI/CD Pipelines  \u2022  Docker"),
    ("AI / ML", "LLM Agents  \u2022  RAG Systems  \u2022  Custom AI Workflows"),
    ("Design", "Figma  \u2022  Design Systems  \u2022  Prototyping"),
    ("Integrations", "Stripe  \u2022  Mapbox  \u2022  Third-party APIs"),
]

for cat, items in tech:
    t_data = [[
        Paragraph(f"<font color='#00d4aa' size='9'><b>{cat}</b></font>", st['tech_cat']),
        Paragraph(f"<font color='#7a8a99' size='9'>{items}</font>", st['tech_items']),
    ]]
    tt = Table(t_data, colWidths=[110, content_w - 120])
    tt.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), BG_CARD),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LINEBELOW', (0,0), (-1,-1), 0.5, HexColor("#0d1526")),
    ]))
    story.append(tt)

story.append(PageBreak())


# ══════════════════════════════════════════════════════════════════════════════
# PAGE 8: FAQ
# ══════════════════════════════════════════════════════════════════════════════
section_header("FAQ", "Frequently Asked Questions")

faqs = [
    ("What software and digital services does Forrof provide?",
     "Forrof is a full-service software agency offering branding, UI/UX design, custom web development, "
     "mobile app development, SaaS solutions, SEO, digital marketing, cloud solutions, automation, "
     "cybersecurity, and digital transformation services."),
    ("How long does a project take?",
     "UI/UX design and branding typically take 4\u20136 weeks. Custom web development, SaaS platforms, "
     "and mobile applications usually take 8\u201312 weeks. A detailed timeline is shared after discovery."),
    ("How much does custom software development cost?",
     "Projects typically start from $5,490, with monthly retainers available from $8,990/month "
     "for ongoing design, development, and services."),
    ("Do you work with international clients?",
     "Yes, Forrof specializes in remote collaboration using modern communication tools "
     "for clients across different time zones."),
    ("Do you offer revisions and ongoing support?",
     "Yes, all projects include revisions and ongoing support, performance optimization, "
     "and feature enhancements."),
]

for q, a in faqs:
    faq_data = [[Paragraph(
        f"<font color='#00d4aa' size='10'>Q:</font>  "
        f"<font color='#f0ece6' size='10'><b>{q}</b></font><br/><br/>"
        f"<font color='#7a8a99' size='9'>{a}</font>",
        st['card_body']
    )]]
    ft = Table(faq_data, colWidths=[content_w])
    ft.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), BG_CARD),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 14),
        ('BOTTOMPADDING', (0,0), (-1,-1), 14),
        ('LEFTPADDING', (0,0), (-1,-1), 16),
        ('RIGHTPADDING', (0,0), (-1,-1), 16),
        ('ROUNDEDCORNERS', [6, 6, 6, 6]),
    ]))
    story.append(ft)
    story.append(Spacer(1, 6))

story.append(PageBreak())


# ══════════════════════════════════════════════════════════════════════════════
# PAGE 9: CONTACT / CTA
# ══════════════════════════════════════════════════════════════════════════════
story.append(Spacer(1, 60))
story.append(DotGrid(cols=14, rows=3, spacing=14, dot_r=1, color=ACCENT))
story.append(Spacer(1, 30))

story.append(Paragraph("Let's Build Something", st['closing_title']))
story.append(Paragraph(
    "<font color='#00d4aa'>Great Together</font>",
    S('closing_accent', fontSize=30, leading=38, fontName='Helvetica-Bold',
      textColor=ACCENT, alignment=TA_CENTER, spaceAfter=12)
))

cl_table = Table([[AccentLine(width=120, thickness=3, color=ACCENT)]], colWidths=[content_w])
cl_table.setStyle(TableStyle([('ALIGN', (0,0), (0,0), 'CENTER')]))
story.append(cl_table)
story.append(Spacer(1, 16))

story.append(Paragraph(
    "Ready to transform your business with intelligent software?<br/>"
    "Get in touch and let's discuss your next project.",
    st['body_c']
))
story.append(Spacer(1, 30))

# Contact card
contact = [
    ("Email", "hello@forrof.io"),
    ("Careers", "careers@forrof.io"),
    ("Phone", "+1 (555) 123-4567"),
    ("Website", "forrof.io"),
    ("Location", "New York, NY"),
]
contact_rows = []
for label, value in contact:
    contact_rows.append([
        Paragraph(f"<font color='#4a5568' size='9'><b>{label}</b></font>", st['contact_label']),
        Paragraph(f"<font color='#f0ece6' size='11'>{value}</font>", st['contact_value']),
    ])

ct = Table(contact_rows, colWidths=[120, content_w - 140])
ct.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), BG_CARD),
    ('BOX', (0,0), (-1,-1), 0.5, BORDER),
    ('TOPPADDING', (0,0), (-1,-1), 10),
    ('BOTTOMPADDING', (0,0), (-1,-1), 10),
    ('LEFTPADDING', (0,0), (-1,-1), 20),
    ('LINEBELOW', (0,0), (-1,-2), 0.5, BORDER),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('ROUNDEDCORNERS', [8, 8, 8, 8]),
]))
story.append(ct)
story.append(Spacer(1, 20))

# Social links
story.append(Paragraph(
    "<font color='#4a5568'>Twitter/X:</font> <font color='#7a8a99'>@forrof_io</font>  |  "
    "<font color='#4a5568'>Instagram:</font> <font color='#7a8a99'>@forrof.io</font>  |  "
    "<font color='#4a5568'>LinkedIn:</font> <font color='#7a8a99'>/company/forrof</font>  |  "
    "<font color='#4a5568'>TikTok:</font> <font color='#7a8a99'>@forrof</font>",
    S('socials', fontSize=8, leading=12, textColor=TEXT_DIM, alignment=TA_CENTER, spaceAfter=12)
))

story.append(Paragraph(
    "\u00a9 2026 Forrof. All rights reserved.",
    S('copyright', fontSize=8, textColor=TEXT_DIM, alignment=TA_CENTER)
))


# ─── Build ───────────────────────────────────────────────────────────────────
doc.build(story, onFirstPage=draw_page_bg, onLaterPages=draw_page_bg)
print(f"\nPDF generated: {output_path}")
