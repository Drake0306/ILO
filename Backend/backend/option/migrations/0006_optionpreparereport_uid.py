# Generated by Django 4.0.3 on 2023-04-25 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('option', '0005_alter_optionpreparereport_fileupload'),
    ]

    operations = [
        migrations.AddField(
            model_name='optionpreparereport',
            name='uid',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
