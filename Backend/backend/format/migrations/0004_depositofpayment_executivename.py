# Generated by Django 4.1.2 on 2023-12-19 07:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('format', '0003_authorityletter_executivename'),
    ]

    operations = [
        migrations.AddField(
            model_name='depositofpayment',
            name='executiveName',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]