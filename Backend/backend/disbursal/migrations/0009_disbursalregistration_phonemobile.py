# Generated by Django 4.1.2 on 2023-08-22 13:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('disbursal', '0008_disbursalbt_statusvalue_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='disbursalregistration',
            name='phoneMobile',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
