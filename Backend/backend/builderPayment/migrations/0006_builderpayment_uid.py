# Generated by Django 4.0.3 on 2023-04-25 16:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('builderPayment', '0005_alter_builderpayment_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='builderpayment',
            name='uid',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
