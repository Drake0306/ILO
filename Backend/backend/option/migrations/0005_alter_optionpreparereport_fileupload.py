# Generated by Django 4.1.2 on 2022-11-06 04:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('option', '0004_optionpreparereport_searchexp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='optionpreparereport',
            name='fileUpload',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
