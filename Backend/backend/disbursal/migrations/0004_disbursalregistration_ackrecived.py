# Generated by Django 4.0 on 2023-06-24 17:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('disbursal', '0003_disbursalbt_uid_disbursalregistration_uid'),
    ]

    operations = [
        migrations.AddField(
            model_name='disbursalregistration',
            name='ackRecived',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
