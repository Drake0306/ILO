# Generated by Django 4.1.2 on 2023-08-22 13:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('disbursal', '0009_disbursalregistration_phonemobile'),
    ]

    operations = [
        migrations.AddField(
            model_name='disbursalregistration',
            name='caseCloseVal',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
