# Generated by Django 4.1.2 on 2023-07-18 06:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='authorityLetter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reciptDate', models.CharField(blank=True, max_length=250, null=True)),
                ('refNo', models.CharField(blank=True, max_length=250, null=True)),
                ('bank', models.CharField(blank=True, max_length=250, null=True)),
                ('branch', models.CharField(blank=True, max_length=250, null=True)),
                ('customerBorrower', models.CharField(blank=True, max_length=250, null=True)),
                ('phoneNo', models.CharField(blank=True, max_length=250, null=True)),
                ('address', models.CharField(blank=True, max_length=250, null=True)),
                ('builderName', models.CharField(blank=True, max_length=250, null=True)),
                ('documents', models.CharField(blank=True, max_length=250, null=True)),
                ('documentsCollected', models.CharField(blank=True, max_length=250, null=True)),
                ('dateDocCollect', models.CharField(blank=True, max_length=250, null=True)),
                ('documentSentOn', models.CharField(blank=True, max_length=250, null=True)),
                ('CaseClosed', models.CharField(blank=True, max_length=250, null=True)),
                ('AckReceived', models.CharField(blank=True, max_length=250, null=True)),
                ('AckFiled', models.CharField(blank=True, max_length=250, null=True)),
                ('volNo', models.CharField(blank=True, max_length=250, null=True)),
                ('sn', models.CharField(blank=True, max_length=250, null=True)),
                ('remarks', models.CharField(blank=True, max_length=250, null=True)),
                ('status', models.CharField(default='true', max_length=250)),
            ],
        ),
        migrations.CreateModel(
            name='depositOfPayment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reciptDate', models.CharField(blank=True, max_length=250, null=True)),
                ('refNo', models.CharField(blank=True, max_length=250, null=True)),
                ('bank', models.CharField(blank=True, max_length=250, null=True)),
                ('branch', models.CharField(blank=True, max_length=250, null=True)),
                ('customerBorrower', models.CharField(blank=True, max_length=250, null=True)),
                ('paymentDetails', models.CharField(blank=True, max_length=250, null=True)),
                ('address', models.CharField(blank=True, max_length=250, null=True)),
                ('builderName', models.CharField(blank=True, max_length=250, null=True)),
                ('DateofDeposit', models.CharField(blank=True, max_length=250, null=True)),
                ('Receiptparticulars', models.CharField(blank=True, max_length=250, null=True)),
                ('dateReceiptSentToBank', models.CharField(blank=True, max_length=250, null=True)),
                ('CaseClosed', models.CharField(blank=True, max_length=250, null=True)),
                ('AckReceived', models.CharField(blank=True, max_length=250, null=True)),
                ('AckFiled', models.CharField(blank=True, max_length=250, null=True)),
                ('volNo', models.CharField(blank=True, max_length=250, null=True)),
                ('sn', models.CharField(blank=True, max_length=250, null=True)),
                ('remarks', models.CharField(blank=True, max_length=250, null=True)),
                ('status', models.CharField(default='true', max_length=250)),
            ],
        ),
    ]
