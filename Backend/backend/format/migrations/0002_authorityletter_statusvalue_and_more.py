# Generated by Django 4.1.2 on 2023-07-31 04:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('format', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='authorityletter',
            name='statusValue',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='depositofpayment',
            name='statusValue',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
