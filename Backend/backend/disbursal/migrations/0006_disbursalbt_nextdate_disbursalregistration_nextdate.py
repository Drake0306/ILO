# Generated by Django 4.0 on 2023-06-24 18:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('disbursal', '0005_disbursalbt_ackrecived'),
    ]

    operations = [
        migrations.AddField(
            model_name='disbursalbt',
            name='nextDate',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='disbursalregistration',
            name='nextDate',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]