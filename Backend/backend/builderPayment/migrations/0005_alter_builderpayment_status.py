# Generated by Django 4.1.2 on 2022-10-23 08:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('builderPayment', '0004_alter_builderpayment_bank_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='builderpayment',
            name='status',
            field=models.CharField(default='true', max_length=250),
        ),
    ]
