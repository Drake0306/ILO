# Generated by Django 4.1.2 on 2023-08-22 13:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('disbursal', '0010_disbursalregistration_casecloseval'),
    ]

    operations = [
        migrations.AddField(
            model_name='disbursalbt',
            name='caseCloseVal',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
